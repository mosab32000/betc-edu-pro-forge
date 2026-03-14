const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('BTECCertificate', function () {
  it('issues token', async function () {
    const [owner] = await ethers.getSigners()
    const C = await ethers.getContractFactory('BTECCertificate')
    const c = await C.deploy()
    await c.waitForDeployment()
    await c.issueCertificate(owner.address)
    expect(await c.ownerOf(1)).to.equal(owner.address)
  })
})
