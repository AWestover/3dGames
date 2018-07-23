

def stupidHash(pwd):
    o = 1
    for c in pwd:
        o = o*ord(c) % 7907
    return o;
        
print(stupidHash("theland"))


pwdHash = 4486


def allCombos(arr, length):
    combos = [[]]
    for i in range(0, length):
      tmp = []
      for el in arr:
        tmp += [ combo + [el] for combo in combos ]
      combos = tmp
    return combos


def codeArrayToWord(codeArray):
   word = ""
   for c in codeArray:
      word += chr(ord('a')+c)
   return word


for i in range(1, 5):
  c_combos = allCombos(list(range(26)), i)
  c_words = [codeArrayToWord(c_combo) for c_combo in c_combos]
  for c_word in c_words:
    if stupidHash(c_word) == pwdHash:
      print(c_word)


