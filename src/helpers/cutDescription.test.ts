import { cutDescription } from "./cutDescription";

const longStr =
  "Lorem ipsum dolor et dolore magna aliqua. Venenatis lectus magna fringilla urna. Elementum curabitur vitae nunc sed velit dignissim sodales ut. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Phasellus faucibus scelerisque eleifend donec pretium. Gravida cum sociis natoque penatibus et. Nunc mi ipsum faucibus vitae aliquet nec. Porta lorem mollis aliquam ut porttitor leo a diam. Aliquet nec ullamcorper sit amet risus nullam eget. Nullam non nisi est sit amet facilisis magna etiam. Ornare lectus sit amet est placerat in egestas. magna eget";
const shortStr = "Lorem ipsum";

describe("cutDescription", () => {
  it("cut string if desired length is less than string length", () => {
    const stringLength = 10;
    const cutString = cutDescription(longStr, stringLength);
    expect(cutString.length === stringLength + 3).toBeTruthy();
  });
  it("cut string if desired length is less than string length", () => {
    const stringLength = 12;
    const cutString = cutDescription(shortStr, stringLength);
    expect(cutString === shortStr).toBeTruthy();
  });
  it("return empty string in case of wrong entered params", () => {
    const stringLength = undefined;
    //@ts-ignore
    const cutString = cutDescription(12, stringLength);
    expect(cutString === "").toBeTruthy();
  });
});
