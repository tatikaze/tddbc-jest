import { strict as assert } from "assert";
import { Range } from "./range";

describe("Rangeクラス", () => {
  describe("インスタンス化する", () => {
    describe("コンストラクタを実行するとRangeインスタンスを返す", () => {
      test("下端点が上端点よりも大きい値である閉区間[3, 7]を渡すとRangeインスタンスを返す", () => {
        const range = new Range(3, 7);
        assert.equal(range instanceof Range, true);
      });
      test("下端点と上端点が同じ値である閉区間[3,3]を渡すとRangeインスタンスを返す", () => {
        const range = new Range(3, 3);
        assert.equal(range instanceof Range, false);
      });
    });

    describe("コンストラクタ実行時に引数が不正の場合エラーがスローされる", () => {
      test("下端点が上端点を上回っている場合には'Invalid range'がスローされる", () => {
        expect(() => new Range(2, 1)).toThrowError(new Error("Invalid range"));
      });

      describe("下端点もしくは上端点に整数でない値が渡された場合には'Invalid range'がスローされる", () => {
        test.each([
          {
            range: [1.5, 2],
            description:
              "下端点に整数でない値が渡された場合には'Invalid range'がスローされる",
          },
          {
            range: [1, 2.5],
            description:
              "上端点に整数でない値が渡された場合には'Invalid range'がスローされる",
          },
        ])("$description", ({ range }) => {
          expect(() => new Range(range[0], range[1])).toThrowError(
            new Error("Invalid range")
          );
        });
      });
    });
  });

  describe("文字列表記を返す", () => {
    test("閉区間[3,7]において'[3,7]'を返す", () => {
      const range = new Range(3, 7);
      assert.equal(range.toString(), "[3,7]");
    });
  });

  describe("指定した整数を含むか判定する", () => {
    describe("閉区間[3,7]において", () => {
      test.each([
        {
          input: 3,
          expected: true,
          description: "は下端点であるため整数閉区間に含まれる",
        },
        {
          input: 7,
          expected: true,
          description: "は上端点であるため整数閉区間に含まれる",
        },
        {
          input: 2,
          expected: false,
          description: "は下端点よりも小さいため整数閉区間に含まれない",
        },
        {
          input: 8,
          expected: false,
          description: "は上端点よりも大きいため整数閉区間に含まれない",
        },
      ])("$input $description", ({ input, expected }) => {
        const range = new Range(3, 7);
        assert.equal(range.contains(input), expected);
      });
    });
    describe("下端点と上端点が同じ値である閉区間[3,3]において", () => {
      test.each([
        {
          input: 3,
          expected: true,
          description: "は下端点かつ上端点であるため整数閉区間に含まれる",
        },
        {
          input: 2,
          expected: false,
          description: "は下端点よりも小さいため整数閉区間に含まれない",
        },
        {
          input: 4,
          expected: false,
          description: "は上端点よりも大きいため整数閉区間に含まれない",
        },
      ])("$input$description", ({ input, expected }) => {
        const range = new Range(3, 3);
        assert.equal(range.contains(input), expected);
      });
    });
  });
});
