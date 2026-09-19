const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, 'manifest.json'), 'utf8'));

console.log('1. Validando manifest e sintaxe dos scripts...');
execSync('npm run check', { stdio: 'inherit', cwd: rootDir });

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const firefoxManifest = JSON.parse(JSON.stringify(manifest));

// Firefox MV3 suporta tanto background scripts (event pages) quanto service_worker.
// Usar scripts dá suporte mais amplo a versões anteriores do Firefox (109+).
firefoxManifest.background = {
  scripts: ['background.js']
};

firefoxManifest.browser_specific_settings = {
  gecko: {
    id: 'mxm-studio-log-envios@nero',
    strict_min_version: '109.0'
  }
};

const xpiName = `echoform-firefox-v${manifest.version}.xpi`;
const zipName = `echoform-firefox-v${manifest.version}.zip`;
const xpiPath = path.join(distDir, xpiName);
const zipPath = path.join(distDir, zipName);

// Cria diretório temporário para o build do Firefox
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'echoform-firefox-'));

try {
  const filesToCopy = [
    'background.js',
    'content.js',
    'injected.js',
    'locales',
    'icons',
    'sounds',
    'LICENSE',
    'README.md'
  ];

  for (const item of filesToCopy) {
    const src = path.join(rootDir, item);
    const dest = path.join(tmpDir, item);
    if (fs.statSync(src).isDirectory()) {
      fs.cpSync(src, dest, { recursive: true });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  // Escreve manifest customizado para Firefox
  fs.writeFileSync(path.join(tmpDir, 'manifest.json'), JSON.stringify(firefoxManifest, null, 2), 'utf8');

  // Remove artefatos antigos se existirem
  if (fs.existsSync(xpiPath)) fs.unlinkSync(xpiPath);
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

  console.log(`\n2. Empacotando extensão para Firefox (AMO): ${xpiName}...`);
  execSync(`zip -r "${xpiPath}" * -x "*.git*" "*.DS_Store*"`, { stdio: 'inherit', cwd: tmpDir });
  
  // Cria cópia .zip para AMO upload dashboard
  fs.copyFileSync(xpiPath, zipPath);

  const stats = fs.statSync(xpiPath);
  console.log(`\n🎉 Pacote Firefox gerado com sucesso em:`);
  console.log(`📁 ${xpiPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  console.log(`📁 ${zipPath} (${(stats.size / 1024).toFixed(1)} KB)`);
  console.log(`\nPronto para upload no Mozilla Developer Hub (AMO) ou instalação direta!`);
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
