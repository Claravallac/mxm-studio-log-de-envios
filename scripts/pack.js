const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

console.log('====================================================');
console.log('📦 BUILD ECHOFORM PARA CHROME & FIREFOX');
console.log('====================================================\n');

console.log('>>> [1/2] BUILD PARA GOOGLE CHROME (MV3)...');
execSync('node scripts/pack-chrome.js', { stdio: 'inherit', cwd: rootDir });

console.log('\n----------------------------------------------------\n');

console.log('>>> [2/2] BUILD PARA MOZILLA FIREFOX (MV3 / AMO)...');
execSync('node scripts/pack-firefox.js', { stdio: 'inherit', cwd: rootDir });

console.log('\n====================================================');
console.log('🎉 TODOS OS BUILDS FORAM CONCLUÍDOS COM SUCESSO!');
console.log('Arquivos disponíveis em dist/:');
execSync('ls -lh dist/', { stdio: 'inherit', cwd: rootDir });
console.log('====================================================\n');
