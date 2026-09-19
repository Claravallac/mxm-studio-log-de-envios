const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const manifest = JSON.parse(fs.readFileSync(path.join(rootDir, 'manifest.json'), 'utf8'));

// Executa validação antes
console.log('1. Validando manifest e arquivos...');
execSync('node scripts/validate-manifest.js', { stdio: 'inherit', cwd: rootDir });

console.log('\n2. Verificando sintaxe dos scripts...');
execSync('node --check background.js', { stdio: 'inherit', cwd: rootDir });
execSync('node --check content.js', { stdio: 'inherit', cwd: rootDir });
execSync('node --check injected.js', { stdio: 'inherit', cwd: rootDir });
console.log('✅ Sintaxe JS OK!');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const zipName = `echoform-chrome-v${manifest.version}.zip`;
const zipPath = path.join(distDir, zipName);

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log(`\n3. Empacotando extensão para Chrome Web Store: ${zipName}...`);
// Inclui apenas arquivos essenciais da extensão
const filesToInclude = [
  'manifest.json',
  'background.js',
  'content.js',
  'injected.js',
  'icons',
  'sounds',
  'LICENSE',
  'README.md'
];

const cmd = `zip -r "${zipPath}" ${filesToInclude.join(' ')} -x "*.git*" "*.DS_Store*"`;
execSync(cmd, { stdio: 'inherit', cwd: rootDir });

const stats = fs.statSync(zipPath);
console.log(`\n🎉 Pacote gerado com sucesso em:`);
console.log(`📁 ${zipPath} (${(stats.size / 1024).toFixed(1)} KB)`);
console.log(`\nPronto para upload no Chrome Web Store Developer Dashboard!`);
