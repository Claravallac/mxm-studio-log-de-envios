const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const manifestPath = path.join(rootDir, 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('❌ manifest.json não encontrado!');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('Validando manifest.json para Chrome Web Store (MV3)...');

let hasError = false;

function error(msg) {
  console.error(`❌ Erro: ${msg}`);
  hasError = true;
}

function success(msg) {
  console.log(`✅ ${msg}`);
}

// 1. Manifest version
if (manifest.manifest_version !== 3) {
  error(`manifest_version deve ser 3. Encontrado: ${manifest.manifest_version}`);
} else {
  success('manifest_version: 3');
}

// 2. Name
if (!manifest.name || manifest.name.length > 45) {
  error(`name deve ter no máximo 45 caracteres. Encontrado (${manifest.name ? manifest.name.length : 0}): ${manifest.name}`);
} else {
  success(`name: "${manifest.name}"`);
}

// 3. Version
if (!manifest.version || !/^\d+(\.\d+){1,3}$/.test(manifest.version)) {
  error(`version deve seguir o padrão semver de até 4 números (ex: 1.0.0). Encontrado: ${manifest.version}`);
} else {
  success(`version: "${manifest.version}"`);
}

// 4. Description
if (!manifest.description || manifest.description.length > 132) {
  error(`description deve ter no máximo 132 caracteres no Chrome Web Store. Atual: ${manifest.description ? manifest.description.length : 0}`);
} else {
  success(`description (${manifest.description.length} chars): "${manifest.description}"`);
}

// 5. Background service_worker
if (!manifest.background || !manifest.background.service_worker) {
  error('Chrome MV3 exige "background": { "service_worker": "..." }');
} else if (!fs.existsSync(path.join(rootDir, manifest.background.service_worker))) {
  error(`Arquivo service_worker não encontrado: ${manifest.background.service_worker}`);
} else {
  success(`service_worker: "${manifest.background.service_worker}" existe`);
}

// 6. Icons
for (const [size, iconPath] of Object.entries(manifest.icons || {})) {
  if (!fs.existsSync(path.join(rootDir, iconPath))) {
    error(`Ícone ${size} não encontrado: ${iconPath}`);
  }
}
success('Todos os ícones da extensão existem');

// 7. Action icons
for (const [size, iconPath] of Object.entries((manifest.action && manifest.action.default_icon) || {})) {
  if (!fs.existsSync(path.join(rootDir, iconPath))) {
    error(`Ícone de ação ${size} não encontrado: ${iconPath}`);
  }
}
success('Todos os ícones de action existem');

// 8. Content scripts
for (const cs of manifest.content_scripts || []) {
  for (const js of cs.js || []) {
    if (!fs.existsSync(path.join(rootDir, js))) {
      error(`Content script não encontrado: ${js}`);
    }
  }
}
success('Todos os content_scripts existem');

// 9. Web accessible resources
for (const war of manifest.web_accessible_resources || []) {
  for (const res of war.resources || []) {
    if (!fs.existsSync(path.join(rootDir, res))) {
      error(`web_accessible_resource não encontrado: ${res}`);
    }
  }
}
success('Todos os web_accessible_resources existem');

if (hasError) {
  console.error('\nValidação falhou!');
  process.exit(1);
} else {
  console.log('\n🎉 manifest.json 100% válido para Chrome e Chrome Web Store!');
}
