function convertLetters(str) {
  const objectOfLetters = {
    ქ: "q",
    წ: "ts",
    ე: "e",
    რ: "r",
    ტ: "t",
    ყ: "k",
    უ: "u",
    ი: "i",
    ო: "o",
    პ: "p",
    ა: "a",
    ს: "s",
    დ: "d",
    ფ: "ph",
    გ: "g",
    ჰ: "h",
    ჯ: "j",
    კ: "k",
    ლ: "l",
    ზ: "z",
    ხ: "kh",
    ც: "ts",
    ვ: "v",
    ბ: "b",
    ნ: "n",
    მ: "m",
    ღ: "gh",
    თ: "t",
    შ: "sh",
    ჟ: "zh",
    ძ: "dz",
    ჩ: "ch",
    ჭ: "tch", 
  };

  const words = str.split(' ')
  const convertedWords = words.map(word => word.split("")
    .map((letter) => objectOfLetters[letter])
    .join("")
  )

  return convertedWords.join(' ')
}

export default convertLetters;
