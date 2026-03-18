export const blockchainService = {
  async issueCertificate(input: { userId: string; courseId: string }) {
    return {
      tokenId: `token-${input.userId}-${input.courseId}`,
      txHash: '0xmocked'
    }
  }
}
