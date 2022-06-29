import axios from 'axios'

class HTTP {
  getYearnHistoricalEarnings = async (
    chainId: number,
  ): Promise<Array<{ time: string; value: string }>> => {
    const { data } = await axios.get(
      `https://cache.yearn.finance/v1/chains/${chainId}/vaults/get`,
    )
    console.log({ data })
    // TODO THIS NEEDS TO BE FILTERED BY USING THE TOKEN ADDRESS.
    // INSTEAD WE RETURN THE FIRST ITEM FROM THE ARRAY
    const item = data[15]

    const result = (item.metadata.historicEarnings ?? []).map((i: any) => {
      return { time: i.date, value: i.earnings.amountUsdc }
    })

    const withoutDuplicates: any[] = []

    for (const row of result) {
      const alreadyAdded = withoutDuplicates.find(
        (r: any) => r.date === row.date,
      )
      if (!alreadyAdded) {
        withoutDuplicates.push(row)
      }
    }
    console.log(withoutDuplicates)

    return withoutDuplicates
  }
}

export const http = new HTTP()
