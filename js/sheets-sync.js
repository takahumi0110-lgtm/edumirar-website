// Google Sheets CSV Export URLs
const SHEET_URLS = {
    MATCH_DATA: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2Enc--6H5oD2PAu7rPxAxlugvMnZLE7p8aNeZaJJPz_jbeExEY8D2wXTSNdvPgF4ToZof6rD2kDBa/pub?gid=923604561&single=true&output=csv',
    RANKING: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2Enc--6H5oD2PAu7rPxAxlugvMnZLE7p8aNeZaJJPz_jbeExEY8D2wXTSNdvPgF4ToZof6rD2kDBa/pub?gid=523505222&single=true&output=csv',
    SCHEDULE: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2Enc--6H5oD2PAu7rPxAxlugvMnZLE7p8aNeZaJJPz_jbeExEY8D2wXTSNdvPgF4ToZof6rD2kDBa/pub?gid=1579402973&single=true&output=csv',
    ACTIVITY: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2Enc--6H5oD2PAu7rPxAxlugvMnZLE7p8aNeZaJJPz_jbeExEY8D2wXTSNdvPgF4ToZof6rD2kDBa/pub?gid=1036375062&single=true&output=csv'
};

// Simple CSV Parser
function parseCSV(csvText) {
    // Strip BOM if present
    let cleanCsvText = csvText.replace(/^\uFEFF/, '').replace(/[\u200B-\u200D\uFEFF]/g, '');
    const lines = cleanCsvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return [];
    
    // Parse headers safely handling quotes
    const headers = lines[0].split(',').map(h => {
        let clean = h.trim();
        if (clean.startsWith('"') && clean.endsWith('"')) {
            clean = clean.slice(1, -1).replace(/""/g, '"');
        }
        return clean;
    });

    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const vals = lines[i].split(',');
        vals.forEach((val, index) => {
            if (headers[index]) {
                let cleanVal = val.trim();
                if (cleanVal.startsWith('"') && cleanVal.endsWith('"')) {
                    cleanVal = cleanVal.slice(1, -1).replace(/""/g, '"');
                }
                obj[headers[index]] = cleanVal === '-' ? '' : cleanVal;
            }
        });
        result.push(obj);
    }
    return result;
}

// Fetch helper
async function fetchSheetData(url) {
    try {
        const response = await fetch(url);
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error('Error fetching CSV from Google Sheets:', error);
        return [];
    }
}

// Render Functions

async function renderMatchData() {
    const nextMatchContainer = document.getElementById('next-match-container');
    const resultMatchContainer = document.getElementById('result-match-container');
    
    if (nextMatchContainer) nextMatchContainer.innerHTML = '<p style="text-align:center;color:#fff;padding:20px;">Loading data...</p>';
    if (resultMatchContainer) resultMatchContainer.innerHTML = '<p style="text-align:center;color:#fff;padding:20px;">Loading data...</p>';

    const data = await fetchSheetData(SHEET_URLS.MATCH_DATA);
    if (!data || data.length === 0) {
        if (nextMatchContainer) nextMatchContainer.innerHTML = '<p style="text-align:center;color:#fff;padding:20px;">データの取得に失敗しました。ローカル環境では表示できない場合があります。</p>';
        if (resultMatchContainer) resultMatchContainer.innerHTML = '<p style="text-align:center;color:#fff;padding:20px;">データの取得に失敗しました。</p>';
        return;
    }

    // NEXT MATCH data processing
    const nextMatchData = data.find(row => row['区分'] === 'NEXT MATCH');
    const resultMatchData = data.find(row => row['区分'] === 'MATCH RESULT');

    if (nextMatchContainer && nextMatchData) {
        const logoUrl = nextMatchData['相手ロゴ画像URL'] ? nextMatchData['相手ロゴ画像URL'] : 'https://placehold.co/100x100/f0f0f0/999?text=Away';
        const dateStr = nextMatchData['日付'] ? nextMatchData['日付'] : 'TBD';
        const timeStr = nextMatchData['キックオフ時間'] ? nextMatchData['キックオフ時間'] + ' KICK OFF' : 'Time TBD';
        
        nextMatchContainer.innerHTML = `
            <div class="match-block fade-in">
                <h2 class="match-title">NEXT MATCH</h2>
                <p class="match-league">${nextMatchData['大会名_節'] || 'TRAINING MATCH'}</p>
                <p class="match-date">${dateStr}</p>
                <div class="match-teams">
                    <div class="team">
                        <img src="images/EDU-03.png" alt="EDUMIRAR">
                    </div>
                    <div class="match-vs-info">
                        <p>${timeStr}</p>
                        <p class="location">＠ ${nextMatchData['試合会場'] || 'TBD'}</p>
                    </div>
                    <div class="team opp-team">
                        ${nextMatchData['相手ロゴ画像URL'] ? `<img src="${logoUrl}" alt="Away">` : `<div class="white-box" style="display:flex;align-items:center;justify-content:center;background:#fff;border-radius:10px;"><p style="font-size:0.8rem;color:#333;margin:0;font-weight:bold;">${nextMatchData['対戦相手'] || 'Away'}</p></div>`}
                    </div>
                </div>
            </div>
        `;
    }

    if (resultMatchContainer && resultMatchData) {
        const logoUrl = resultMatchData['相手ロゴ画像URL'] ? resultMatchData['相手ロゴ画像URL'] : 'https://placehold.co/100x100/f0f0f0/999?text=Away';
        const dateStr = resultMatchData['日付'] ? resultMatchData['日付'] : 'TBD';
        const myScore = resultMatchData['自チームスコア'] || '0';
        const oppScore = resultMatchData['相手チームスコア'] || '0';

        resultMatchContainer.innerHTML = `
            <div class="match-block result-block fade-in">
                <h2 class="match-title">MATCH RESULT</h2>
                <p class="match-league">${resultMatchData['大会名_節'] || 'TRAINING MATCH'}</p>
                <p class="match-date">${dateStr}</p>
                <div class="match-teams">
                    <div class="team">
                        <img src="images/EDU-03.png" alt="EDUMIRAR">
                    </div>
                    <div class="match-score">
                        <p class="score">${myScore}-${oppScore}</p>
                    </div>
                    <div class="team opp-team">
                        ${resultMatchData['相手ロゴ画像URL'] ? `<img src="${logoUrl}" alt="Away">` : `<div class="white-box" style="display:flex;align-items:center;justify-content:center;background:#fff;border-radius:10px;"><p style="font-size:0.8rem;color:#333;margin:0;font-weight:bold;">${resultMatchData['対戦相手'] || 'Away'}</p></div>`}
                    </div>
                </div>
            </div>
        `;
    }

    // Apply fade-in observation to new elements
    if (window.fadeObserver) {
        if (nextMatchContainer) {
            nextMatchContainer.querySelectorAll('.fade-in').forEach(el => window.fadeObserver.observe(el));
        }
        if (resultMatchContainer) {
            resultMatchContainer.querySelectorAll('.fade-in').forEach(el => window.fadeObserver.observe(el));
        }
    }
}

async function renderRankingData() {
    const container = document.getElementById('ranking-container');
    if (!container) return;

    container.innerHTML = '<span style="font-size:0.8rem;color:#ccc;">Loading...</span>';

    const data = await fetchSheetData(SHEET_URLS.RANKING);
    if (!data || data.length === 0) {
        container.innerHTML = '<span style="font-size:0.8rem;color:#ccc;">Data not found</span>';
        return;
    }

    // Use the first row for the main team's stats
    const teamStats = data[0]; 
    if (teamStats) {
        container.innerHTML = `
            <span class="rank-num">第${teamStats['順位'] || '-'}位</span> 
            <span class="rank-unit">(${teamStats['勝'] || '0'}勝 ${teamStats['分'] || '0'}分 ${teamStats['負'] || '0'}負)</span>
        `;
    }
}

async function renderScheduleData() {
    const track = document.getElementById('schedule-track-dynamic');
    if (!track) return;

    track.innerHTML = '<p style="color:#666;text-align:center;width:100%;">Loading schedule...</p>';

    const data = await fetchSheetData(SHEET_URLS.SCHEDULE);
    if (!data || data.length === 0) {
        track.innerHTML = '<p style="color:#666;text-align:center;width:100%;">データの取得に失敗しました</p>';
        return;
    }

    let trackHtml = '';
    const totalSchedules = data.length;
    
    data.forEach(item => {
        const dateStr = item['年月'] || '';
        const imgUrl = item['画像URL'] || `https://placehold.co/400x500/fff/333?text=${dateStr}+Schedule`;
        
        trackHtml += `
            <div class="slide-item" style="flex: 1 0 ${100/totalSchedules}%; text-align: center; padding: 0 10px;">
                <div class="calendar-header" style="font-weight: bold; font-size: 1.2rem; color: var(--primary-color); margin-bottom: 10px;">${dateStr}</div>
                <img src="${imgUrl}" alt="${dateStr}" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            </div>
        `;
    });

    // Update track width dynamically
    track.style.width = `${totalSchedules * 100}%`;
    track.innerHTML = trackHtml;

    // Redefine slider logic
    let currentIdx = 0;
    window.moveDynamicSchedule = function(dir) {
        currentIdx += dir;
        if (currentIdx < 0) currentIdx = totalSchedules - 1;
        if (currentIdx >= totalSchedules) currentIdx = 0;
        track.style.transform = `translateX(-${currentIdx * 100 / totalSchedules}%)`;
    };
}

async function renderActivityReports() {
    const lists = {
        'ACADEMY学習塾': document.getElementById('academy-cram-activity-list'),
        'ACADEMYコベカツ': document.getElementById('academy-kobekatsu-activity-list'),
        'PARTNER': document.getElementById('partner-activity-list')
    };

    // Replace dummy content with loading message
    Object.values(lists).forEach(container => {
        if (container) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Loading Reports...</p>';
        }
    });

    const data = await fetchSheetData(SHEET_URLS.ACTIVITY);
    if (!data || data.length === 0) {
        Object.values(lists).forEach(container => {
            if (container) {
                container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">実績の取得に失敗しました</p>';
            }
        });
        return;
    }

    // Clear loading texts
    Object.values(lists).forEach(container => {
        if (container) container.innerHTML = '';
    });

    data.forEach(item => {
        const targetPage = item['表示先ページ'];
        const container = lists[targetPage];
        if (container) {
            const dateStr = item['日付'] || '';
            const title = item['タイトル'] || '';
            const imgUrl = item['画像URL'] || `https://placehold.co/300x200/eee/999?text=No+Image`;
            const linkUrl = item['リンク先URL'] || '#';

            const card = document.createElement('a');
            card.href = linkUrl;
            card.target = '_blank';
            card.className = 'activity-card';
            card.style.display = 'block';
            card.style.textDecoration = 'none';
            card.style.color = 'inherit';
            card.style.background = '#fff';
            card.style.borderRadius = '8px';
            card.style.overflow = 'hidden';
            card.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
            card.style.transition = 'transform 0.2s';
            card.onmouseover = () => card.style.transform = 'translateY(-5px)';
            card.onmouseout = () => card.style.transform = 'translateY(0)';

            card.innerHTML = `
                <div style="height: 150px; overflow: hidden;">
                    <img src="${imgUrl}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="padding: 15px;">
                    <p style="font-size: 0.8rem; color: #666; margin-bottom: 5px;">${dateStr}</p>
                    <h4 style="font-size: 1rem; margin: 0; line-height: 1.4;">${title}</h4>
                </div>
            `;
            container.appendChild(card);
        }
    });

}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Determine which components exist on the page and render
    if (document.getElementById('next-match-container') || document.getElementById('result-match-container')) {
        renderMatchData();
    }
    if (document.getElementById('ranking-container')) {
        renderRankingData();
    }
    if (document.getElementById('schedule-track-dynamic')) {
        renderScheduleData();
    }
    if (document.getElementById('academy-cram-activity-list') || 
        document.getElementById('academy-kobekatsu-activity-list') || 
        document.getElementById('partner-activity-list')) {
        renderActivityReports();
    }
});
