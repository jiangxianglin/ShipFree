const enamdict = require('enamdict');

console.log('Initializing enamdict...');
enamdict.init(function() {
    console.log('Enamdict initialized.');
    
    const name = '佐藤';
    console.log(`Searching for Kanji: ${name}`);
    const entries = enamdict.findKanji(name);
    
    console.log('Kana:', entries.kana());
    console.log('Romaji:', entries.romaji());
    console.log('Type:', entries.type());
    
    const name2 = 'Tanaka';
    console.log(`\nSearching for Romaji: ${name2}`);
    const entries2 = enamdict.find(name2);
    console.log('Kana:', entries2.kana());
    console.log('Kanji:', entries2.kanji());
    console.log('Type:', entries2.type());
});
