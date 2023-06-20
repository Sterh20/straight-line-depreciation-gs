# Straight Line Depreciation - Google Sheets' Custom Function

[![GitHub stars](https://img.shields.io/github/stars/Sterh20/straight-line-depreciation-gs.svg?style=social&label=Stars)](https://github.com/Sterh20/straight-line-depreciation-gs/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Sterh20/straight-line-depreciation-gs.svg?style=social&label=Forks)](https://github.com/Sterh20/straight-line-depreciation-gs/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Sterh20/straight-line-depreciation-gs.svg?style=social&label=Watchers)](https://github.com/Sterh20/straight-line-depreciation-gs/watchers)
[![GitHub followers](https://img.shields.io/github/followers/Sterh20.svg?style=social&label=Followers)](https://github.com/Sterh20/?tab=followers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Google Sheets Badge](https://img.shields.io/badge/Google%20Sheets-34A853?logo=googlesheets&logoColor=fff&style=flat)
![Google Apps Script Badge](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=googleappsscript&logoColor=fff&style=flat)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)
![Node.js Badge](https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=flat)
![ESLint Badge](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=flat)
![Prettier Badge](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=flat)

This project implements a function for calculating the sum of depreciation for a given rate and period using the straight-line depreciation method. This function is **very useful when your model has a lot of asset commissions with the same depreciation rate**, but you don't want to calculate the depreciation of each asset in a separate row with a custom formula for each row (like in case of built-in formulas). The intended use of the function is with Google Sheets, but since no specific Google Sheets API was used, the function **can be used in any JavaScript project**.

> **Warning**
>
> Google Sheets converts a custom function's input range from a Range object to a number array. As a result, there may be [**floating-point arithmetic problems**](https://ellenaua.medium.com/floating-point-errors-in-javascript-node-js-21aadd897bf8) with the function result. To address this issue, refer to the [**TODO**](#todo) section of this file.

## Demo

Use [this](https://docs.google.com/spreadsheets/d/1ARGb06gp4nvuUe74dpBsstVHJ9lB7lWZAr3BzDmfuzQ/copy) Google sheets file with two demonstration sheets:

* **"SLD_Playground"** sheet - simplified example designed for playing around with inputs and getting a "feel" of the function.
* **"SLD_Demo"** sheet - simplified part of a more complex example.

## Function Description

The `STRAIGHT_LINE_DEPRECIATION` function takes the following parameters:

* `assetsBookValues` (*number[][] | number*): A range of assets' initial book value or cost from the starting period to the current period. The assets should have the same depreciation rate. If a single value is provided, it will be converted into a 1x1 array for consistency.
* `rate` (*number*): Depreciation rate (1 / Recovery period).
* `periodFlag` (*number, optional*): Responsible for asset commissioning timing assumption. It determines when the asset is commissioned and depreciation starts in a period. The default value is 1, representing immediate annuity. Use 0 for deferred annuity or 0.5 for the period's middle.

The function returns the sum of the depreciation for the given array of assets' initial book value for a given period. If an error occurs during the calculation, `null` is returned.

## Usage

To use the `STRAIGHT_LINE_DEPRECIATION` function in your Google Sheets spreadsheet, follow these steps:

1. Open your Google Sheets document.
2. Go to "Extensions" > "Apps Script" to open the script editor and create container bound Apps Script project. From **"Project Settings"** save somewhere **Script ID**.
3. Copy the code directly from [**Demo**](#demo) to the new Apps Script project to use right away or clone this repo and follow the instructions in [setup_procedure.md](.setup/setup_procedure.md):

    3.1. In the cloned repo's root directory create `.clasp.json` with a following line:

    ```JSON
    {
        "scriptId":"Script-ID-from-Project-Settings",
        "rootDir":"C:\\Local\\path\\to\\repo",
    }
    ```

    3.2. Compile and upload all repo's files to the Apps Script project:

    ```powershell
    clasp push
    ```

4. Save the script, then close the script editor if you chose to copy the code directly.
5. In your spreadsheet, you can now use the `STRAIGHT_LINE_DEPRECIATION` function in your formulas, like any other built-in function.

For example, to calculate the sum of depreciation at fifth period for assets with an initial book value range from cell A1 to A5, a depreciation rate of 0.1, and immediate annuity, you can use the following formula:

```GoogleSheets
=STRAIGHT_LINE_DEPRECIATION(A$1:A5, 0.1, 1)
```

Make sure to adjust the range and parameters according to your specific requirements.

## Additional Notes

* The implementation of the function accounts for inconsistent behavior of Google Sheets with ranges. If a single value is provided for `assetsBookValues`, it is automatically converted into a 1x1 array for consistency.
* The function uses a loop to iterate over the assets and calculate the depreciation sum. It accounts for asset commissioning timing, recovery period's end, and edge cases to ensure accurate results.
* Useful/helper commands for development of this project (like `.env` activation) are gathered in [activation_procedure.md](.setup/activation_procedure.md)

## License

Distributed under the MIT license. See [LICENSE](/LICENSE) for more information

## TODO

Rewrite to use some kind of equivalent to Decimal or Money class to address [floating-point arithmetic problems](https://ellenaua.medium.com/floating-point-errors-in-javascript-node-js-21aadd897bf8).

<details>
    <summary>Supplementary materials</summary>

Articles about possible Decimal type:

* https://stackoverflow.com/questions/2876536/precise-financial-calculation-in-javascript-what-are-the-gotchas
* https://github.com/MikeMcl/decimal.js/
* https://github.com/Dintero/money

Articles about using npm modules in Apps Script:

* https://medium.com/geekculture/the-ultimate-guide-to-npm-modules-in-google-apps-script-a84545c3f57c
* https://blog.gsmart.in/es6-and-npm-modules-in-google-apps-script/

</details>
