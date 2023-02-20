/*
 * @Author: Yanc
 * @Date: 2023-02-14 17:31:25
 * @LastEditTime: 2023-02-17 15:45:03
 */
import fs from "node:fs";
import { rm } from "fs/promises";
import { cpus } from "node:os";
import path from "path";
import { createRequire } from "node:module";
import { execa } from "execa";
import chalk from "chalk";

const require = createRequire(import.meta.url);

const allTargets = fs.readdirSync("packages").filter((f) => {
  // 过滤掉非目录文件
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false;
  }
  const pkg = require(`../packages/${f}/package.json`);
  // 过滤掉私有包和不带编译配置的包
  if (pkg.private) {
    return false;
  }
  return true;
});

run();

async function run() {
  await buildAll(allTargets);
}

async function buildAll(targets) {
  await runParallel(cpus().length, targets, build);
}

// 实现并行打包
async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source));

    ret.push(p);

    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));

      executing.push(e);
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

async function build(target) {
  const pkgDir = path.resolve(`packages/${target}`);

  // const pkg = require(`${pkgDir}/package.json`);
  await rm(`${pkgDir}/dist`, { recursive: true, force: true });

  // 在子进程中执行打包
  await execa("vite", ["build", "--config", `${pkgDir}/vite.config.ts`], {
    stdio: "inherit",
  });
  console.log(chalk.green(`${target} build success `));
}
