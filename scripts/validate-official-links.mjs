import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';

const packagesDir = new URL('../packages', import.meta.url).pathname;
const requiredKeys = ['website', 'documentation', 'repository'];

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

const entries = await readdir(packagesDir, {withFileTypes: true});
const packageDirs = entries
  .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
  .map((e) => e.name);

let hasError = false;

for (const dir of packageDirs) {
  const pkgPath = join(packagesDir, dir, 'package.json');
  let pkg;

  try {
    pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  } catch (error) {
    console.error(`[FAIL] packages/${dir}: 无法读取 package.json — ${error.message}`);
    hasError = true;
    continue;
  }

  const links = pkg.officialLinks;

  if (!links || typeof links !== 'object') {
    console.error(`[FAIL] packages/${dir}: 缺少 officialLinks 对象`);
    hasError = true;
    continue;
  }

  let pkgError = false;

  for (const key of requiredKeys) {
    if (!links[key]) {
      console.error(`[FAIL] packages/${dir}: officialLinks.${key} 未填写`);
      pkgError = true;
    } else if (!isHttpUrl(links[key])) {
      console.error(
        `[FAIL] packages/${dir}: officialLinks.${key} 不是有效的 http(s) URL — ${links[key]}`,
      );
      pkgError = true;
    }
  }

  if (pkgError) {
    hasError = true;
  } else {
    console.log(`[OK] packages/${dir}`);
  }
}

if (hasError) {
  process.exit(1);
}

console.log(`\n已通过 ${packageDirs.length} 个文档包的官方链接校验。`);
