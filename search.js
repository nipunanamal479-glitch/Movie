// සරල සිංග්ලිෂ් මැපින් එකක්
const sinhalaMap = {
    'ය': 'ya', 'ම': 'ma', 'ර': 'ra', 'ජ': 'ja', 'ස': 'sa', 'ව': 'va', 'ද': 'da', 'ප': 'pa', 'න': 'na', 'වී': 'vee', 'දි': 'di', 'හි': 'hi'
};

function toSinglish(text) {
    let result = text;
    for (let key in sinhalaMap) {
        result = result.split(key).join(sinhalaMap[key]);
    }
    return result;
}

function fuzzyMatch(str, query) {
    // 1. Query එක සිංහල නම් ඒක සිංග්ලිෂ් වලට හරවන්න
    let convertedQuery = toSinglish(query);
    
    str = str.toLowerCase();
    query = convertedQuery.toLowerCase();
    
    // ... කලින් තිබ්බ fuzzy logic එක මෙතන දාන්න ...
    let matrix = [];
    for(let i = 0; i <= str.length; i++) matrix[i] = [i];
    for(let j = 0; j <= query.length; j++) matrix[0][j] = j;
    for(let i = 1; i <= str.length; i++) {
        for(let j = 1; j <= query.length; j++) {
            let cost = (str[i-1] == query[j-1]) ? 0 : 1;
            matrix[i][j] = Math.min(matrix[i-1][j] + 1, matrix[i][j-1] + 1, matrix[i-1][j-1] + cost);
        }
    }
    return matrix[str.length][query.length] <= 3; 
}
