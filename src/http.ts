import axios from 'axios'

class HTTP {
  getYearnHistoricalEarnings = async (
    chainId: number,
    tokenAddress: string,
  ): Promise<Array<{ time: string; value: string }>> => {
    const { data } = await axios.get(
      `https://cache.yearn.finance/v1/chains/${chainId}/vaults/get`,
    )
    // TODO THIS NEEDS TO BE FILTERED BY USING THE TOKEN ADDRESS.
    // INSTEAD WE RETURN THE FIRST ITEM FROM THE ARRAY
    const item = data[0]

    return (item.metadata.historicalEarnings ?? []).map((i: any) => {
      return { time: i.date, value: i.earnings.amount }
    })
  }
}

export const http = new HTTP()
