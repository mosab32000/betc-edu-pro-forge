const hre = require('hardhat')

async function main() {
  const Contract = await hre.ethers.getContractFactory('BTECCertificate')
  const deployed = await Contract.deploy()
  await deployed.waitForDeployment()
  console.log('BTECCertificate:', await deployed.getAddress())
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
