/**
 * Returns the sum of the amount of assets' depreciation and amortization
 *     for a given rate in a given period (year/month...) using strate-line depreciation method.
 *
 * Author: [Sterh20](https://github.com/Sterh20)
 *
 * Repo: [Github Repo](https://github.com/Sterh20/straight-line-depreciation-gs)
 * @param {number[][] | number} assetsBookValues A range of assets' initial book value or cost
 *     from starting to current period. The assets have to have the same depreciation rate.
 * @param {number} rate Depreciation rate (1 / Recovery period).
 * @param {number} periodFlag Responsible for asset commissioning timing assumption.
 *     E.g. when the asset is commissioned and depreciation starts in a period?
 *     At the start of the period (immediate annuity),
 *     at the end of the period (deferred annuity) or in the middle of the period.
 *     For immediate annuity use 1 (default value), for deferred annuity use 0, for the period's middle use 0.5.
 * @return {number | null} The sum of the depreciation for a given array of assets' initial book value for a given period.
 * @customfunction
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function STRAIGHT_LINE_DEPRECIATION (
  assetsBookValues: number[][] | number,
  rate: number,
  periodFlag: number = 1
): number | null {
  // TODO Rewrite to use some kind of equivalent to Decimal or Money class to address precision concerns.
  let columnIndex: number;
  let currentAssetBookValue: number;
  let recoveryPeriodCheck: number = 0;
  let depreciationSum: number = 0;

  // Accounts for inconsistent behavior of Google Sheets with ranges.
  if (typeof assetsBookValues === 'number') {
    assetsBookValues = [[assetsBookValues]];
  }
  const arrayLength: number = assetsBookValues[0].length;

  try {
    for (columnIndex = arrayLength; columnIndex >= 1; columnIndex--) {
      // Accounts for asset commissioning timing.
      if (columnIndex === arrayLength) {
        recoveryPeriodCheck = rate * periodFlag;
      } else {
        recoveryPeriodCheck += rate;
      }

      // Recovery period's end check.
      if (recoveryPeriodCheck >= 1 + rate) {
        break;
      }
      // Accounts for some weird edge cases.
      // E.g. when recovery period is 3 and hence the rate is 1 / 3,
      // but the user input is 0.33 => 0.32 more of the asset cost would be depreciated without the check below.
      // => the asset book value at the end would't be 0 (how it should be), but would be less then 0.
      // Or when recovery period is weird like 1.5 years, but the model is designed for a 1 year discretization.
      // So in this case without the check 0.33(3) more of the asset cost would be depreciated.
      if (recoveryPeriodCheck > 1) {
        rate -= recoveryPeriodCheck - 1;
      }

      currentAssetBookValue = assetsBookValues[0][columnIndex - 1];
      if (columnIndex === arrayLength) {
        depreciationSum = currentAssetBookValue * rate * periodFlag;
      } else {
        depreciationSum += currentAssetBookValue * rate;
      }
    }
    return depreciationSum;
  } catch (error) {
    return null;
  }
}
