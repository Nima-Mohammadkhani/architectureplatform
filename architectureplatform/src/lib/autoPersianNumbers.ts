const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function convertToPersian(input: any): string {
  if (input === null || input === undefined) return "";

  let result = String(input);

  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(englishNumbers[i], "g");
    result = result.replace(regex, persianNumbers[i]);
  }

  return result;
}

export function convertToEnglish(input: any): string {
  if (input === null || input === undefined) return "";

  let result = String(input);

  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(persianNumbers[i], "g");
    result = result.replace(regex, englishNumbers[i]);
  }

  return result;
}

export function formatPricePersian(price: number): string {
  const formattedPrice = new Intl.NumberFormat("fa-IR").format(price);
  return convertToPersian(formattedPrice);
}

export function autoConvertText(text: string): string {
  return convertToPersian(text);
}

export function autoConvertArray<T>(arr: T[]): T[] {
  return arr.map((item) => {
    if (typeof item === "string") {
      return convertToPersian(item) as T;
    }
    if (typeof item === "number") {
      return convertToPersian(item) as T;
    }
    return item;
  });
}

export function autoConvertObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj } as any;

  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (typeof value === "string") {
      result[key] = convertToPersian(value);
    } else if (typeof value === "number") {
      result[key] = convertToPersian(value);
    } else if (Array.isArray(value)) {
      result[key] = autoConvertArray(value);
    }
  });

  return result as T;
}

if (typeof window !== "undefined") {
  console.log("✅ سیستم تبدیل اعداد به فارسی آماده است");
}
