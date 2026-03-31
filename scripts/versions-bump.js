const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getAffectedProjects() {
  try {
    const result = execSync(
      'nx show projects --affected --base=origin/main --head=HEAD --type=app'
    )
      .toString()
      .trim();

    return result ? result.split('\n').filter(Boolean) : [];
  } catch {
    return [];
  }
}

function bumpVersion(packageJsonPath, type = 'patch') {
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const [major, minor, patch] = pkg.version.split('.').map(Number);

  let newVersion;

  if (type === 'major') {
    newVersion = `${major + 1}.0.0`;
  } else if (type === 'minor') {
    newVersion = `${major}.${minor + 1}.0`;
  } else {
    newVersion = `${major}.${minor}.${patch + 1}`;
  }

  pkg.version = newVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));

  return newVersion;
}

function findProjectPackageJson(projectName) {
  const possiblePath = path.join('apps', projectName, 'package.json');

  if (fs.existsSync(possiblePath)) {
    return possiblePath;
  }

  return null;
}

const affected = getAffectedProjects();

if (!affected.length) {
  console.log('✅ No affected projects');
  process.exit(0);
}

console.log('Affected projects:', affected);

affected.forEach((project) => {
  const pkgPath = findProjectPackageJson(project);

  if (!pkgPath) {
    console.log(`⏭ Skip ${project} (no package.json)`);
    return;
  }

  const newVersion = bumpVersion(pkgPath, 'patch');

  console.log(`🔼 ${project} → ${newVersion}`);
});