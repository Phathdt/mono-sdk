const fs = require('fs');
const path = require('path');

function shouldIgnoreFile(filename) {
  return (
    filename === 'index.ts' ||
    filename.startsWith('.') ||
    filename.endsWith('.spec.ts') ||
    filename.endsWith('.test.ts')
  );
}

function shouldIgnoreDirectory(dirName) {
  return dirName === 'node_modules' || dirName === 'dist' || dirName.startsWith('.');
}

function generateIndexContent(files) {
  const exports = files
    .map((file) => {
      const filename = path.basename(file, path.extname(file));
      return `export * from './${filename}';`;
    })
    .join('\n');

  return exports ? exports + '\n' : '';
}

function deleteIndexFiles(dirPath) {
  const indexPath = path.join(dirPath, 'index.ts');
  if (fs.existsSync(indexPath)) {
    fs.unlinkSync(indexPath);
    console.log(`  Deleted: ${indexPath}`);
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  entries
    .filter((entry) => entry.isDirectory() && !shouldIgnoreDirectory(entry.name))
    .forEach((dir) => {
      deleteIndexFiles(path.join(dirPath, dir.name));
    });
}

function processModule(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const tsFiles = entries
    .filter(
      (entry) => entry.isFile() && entry.name.endsWith('.ts') && !shouldIgnoreFile(entry.name)
    )
    .map((entry) => path.join(dirPath, entry.name));

  const subdirectories = entries.filter(
    (entry) => entry.isDirectory() && !shouldIgnoreDirectory(entry.name)
  );

  const subDirExports = subdirectories
    .map((dir) => {
      const subdirPath = path.join(dirPath, dir.name);
      processModule(subdirPath);

      const subdirEntries = fs.readdirSync(subdirPath);
      if (subdirEntries.length > 0) {
        return `export * from './${dir.name}';`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n');

  let content = '';

  if (tsFiles.length > 0) {
    content += generateIndexContent(tsFiles);
  }

  if (subDirExports) {
    content += (content ? '\n' : '') + subDirExports + '\n';
  }

  if (content) {
    const indexPath = path.join(dirPath, 'index.ts');
    fs.writeFileSync(indexPath, content);
    console.log(`  Created: ${indexPath}`);
  }
}

function processPackages() {
  const currentDir = process.cwd();
  const packagesDir = path.join(currentDir, 'packages');

  if (!fs.existsSync(packagesDir)) {
    console.error('Directory packages/ does not exist!');
    return;
  }

  const packages = fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory() && !shouldIgnoreDirectory(dirent.name))
    .map((dirent) => dirent.name);

  packages.forEach((packageName) => {
    const srcPath = path.join(packagesDir, packageName, 'src');
    if (fs.existsSync(srcPath)) {
      console.log(`\nProcessing packages/${packageName}`);
      console.log('Cleaning up old index files...');
      deleteIndexFiles(srcPath);

      console.log('Generating new index files...');
      processModule(srcPath);
    } else {
      console.warn(`Warning: src directory not found in packages/${packageName}`);
    }
  });
}

try {
  processPackages();
  console.log('\nSuccessfully regenerated all index.ts files!');
} catch (error) {
  console.error('Error generating index files:', error);
  process.exit(1);
}
