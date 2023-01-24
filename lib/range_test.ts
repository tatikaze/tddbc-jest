import { strict as assert } from "assert";
import { Range } from "./range";

describe("Rangeクラス", () => {
  describe("整数閉区間クラスのインスタンス化時にエラーがスローされる", () => {
    test("下端点が上端点を上回っている場合には'Invalid range'がスローされる", () => {
      expect(() => new Range(2, 1)).toThrowError(new Error("Invalid range"));
    });
  });

  describe("整数閉区間の文字列表記を返せる", () => {
    test("下端点 3, 上端点 7 の整数閉区間の文字列表記は '[3,7]'", () => {
      const range = new Range(3, 7);
      assert.equal(range.toString(), "[3,7]");
    });

    test("下端点 4, 上端点 9 の整数閉区間の文字列表記は '[4,9]'", () => {
      const range = new Range(4, 9);
      assert.equal(range.toString(), "[4,9]");
    });
  });

  describe("指定した文字列を含むか判定する", () => {
    test("点3 は下端点 3, 上端点 7 の整数閉区間に含まれる", () => {
      const range = new Range(3, 7);
      assert.equal(range.contains(3), true);
    });
  });
});
