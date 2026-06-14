// සිංග්ලිෂ් මැපින් එක (ඔයාට අවශ්‍ය අකුරු තව වැඩි කරගන්න පුළුවන්)
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
    // සර්ච් කරන දේ ඉංග්‍රීසි අකුරු වලට හරවගන්නවා
    let convertedQuery = toSinglish(query).toLowerCase();
    str = str.toLowerCase();
    
    // Fuzzy logic matrix එක
    let matrix = [];
    for(let i = 0; i <= str.length; i++) matrix[i] = [i];
    for(let j = 0; j <= convertedQuery.length; j++) matrix[0][j] = j;

    for(let i = 1; i <= str.length; i++) {
        for(let j = 1; j <= convertedQuery.length; j++) {
            let cost = (str[i-1] == convertedQuery[j-1]) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i-1][j] + 1,
                matrix[i][j-1] + 1,
                matrix[i-1][j-1] + cost
            );
        }
    }
    // මෙතන අකුරු 3ක වෙනසක් දක්වා අවසර දෙනවා
    return matrix[str.length][convertedQuery.length] <= 3; 
}

function filterMovies() {
    const query = document.getElementById('search').value.toLowerCase();
    if (!query) { renderMovies(movies); return; }
    
    // සර්ච් එක හරියටම මැච් වෙනවද නැත්නම් Fuzzy විදියට මැච් වෙනවද කියලා බලනවා
    const filtered = movies.filter(m => 
        m.title.toLowerCase().includes(query) || fuzzyMatch(m.title, query)
    );
    renderMovies(filtered);
}
