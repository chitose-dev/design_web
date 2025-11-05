// ========================================
// ティッカー（スクロールメッセージ）の無限ループ
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const tickerContent = document.getElementById('tickerContent');
    
    if (tickerContent) {
        const tickerHTML = tickerContent.innerHTML;
        tickerContent.innerHTML = tickerHTML + tickerHTML + tickerHTML;
    }
});

// ========================================
// 統計情報のアニメーション
// ========================================
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        if (end >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (end >= 1000) {
            element.textContent = (current / 1000).toFixed(1) + 'K';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

window.addEventListener('load', function() {
    const totalPollsEl = document.getElementById('totalPolls');
    const totalVotesEl = document.getElementById('totalVotes');
    const activeUsersEl = document.getElementById('activeUsers');
    
    if (totalPollsEl) animateValue(totalPollsEl, 0, 2847, 2000);
    if (totalVotesEl) animateValue(totalVotesEl, 0, 1200000, 2000);
    if (activeUsersEl) animateValue(activeUsersEl, 0, 8432, 2000);
});

// ========================================
// 検索機能
// ========================================
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('検索:', query);
            alert(`「${query}」で検索します`);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// ========================================
// クイックフィルター
// ========================================
const quickFilters = document.querySelectorAll('.quick-filter');

quickFilters.forEach(filter => {
    filter.addEventListener('click', function() {
        quickFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        const filterType = this.getAttribute('data-filter');
        console.log('フィルター:', filterType);
        
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// ========================================
// モバイルメニュー
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
});

// ========================================
// カテゴリタブ
// ========================================
const categoryTabs = document.querySelectorAll('.category-tab');

categoryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        categoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.textContent;
        console.log('選択されたカテゴリ:', category);
        
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// ========================================
// 投票カード - 投票機能
// ========================================
const pollCards = document.querySelectorAll('.poll-card');

pollCards.forEach(card => {
    const pollOptions = card.querySelectorAll('.poll-option');
    const pollId = card.getAttribute('data-poll-id');
    
    pollOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // すでに投票済みかチェック
            if (card.classList.contains('voted')) {
                alert('すでに投票済みです');
                return;
            }
            
            const voteType = this.getAttribute('data-vote');
            const optionLabel = this.querySelector('.option-label').textContent;
            
            // アニメーション効果
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 100);
            
            // 投票処理
            console.log('投票:', pollId, voteType, optionLabel);
            
            // 視覚的フィードバック
            const shadowColor = voteType === 'yes' 
                ? 'rgba(34, 197, 94, 0.4)' 
                : 'rgba(239, 68, 68, 0.4)';
            this.style.boxShadow = `0 0 0 4px ${shadowColor}`;
            
            setTimeout(() => {
                this.style.boxShadow = '';
                
                // 選択状態を追加
                this.classList.add('selected');
                card.classList.add('voted');
                
                // 結果を更新（デモ用）
                updateCardResults(card, voteType);
                
                alert(`「${optionLabel}」に投票しました！`);
            }, 500);
        });
    });
});

// ========================================
// 投票結果の更新（デモ用）
// ========================================
function updateCardResults(card, votedFor) {
    const yesBar = card.querySelector('.result-bar-yes');
    const noBar = card.querySelector('.result-bar-no');
    
    if (!yesBar || !noBar) return;
    
    // 現在のパーセンテージを取得
    let yesPercent = parseInt(yesBar.getAttribute('data-percentage'));
    let noPercent = parseInt(noBar.getAttribute('data-percentage'));
    
    // 投票を反映（簡易計算）
    if (votedFor === 'yes') {
        yesPercent = Math.min(100, yesPercent + 1);
        noPercent = 100 - yesPercent;
    } else {
        noPercent = Math.min(100, noPercent + 1);
        yesPercent = 100 - noPercent;
    }
    
    // アニメーションで更新
    setTimeout(() => {
        yesBar.style.width = yesPercent + '%';
        yesBar.setAttribute('data-percentage', yesPercent);
        noBar.style.width = noPercent + '%';
        noBar.setAttribute('data-percentage', noPercent);
        
        // ラベルも更新
        const yesLabel = yesBar.querySelector('.result-bar-label');
        const noLabel = noBar.querySelector('.result-bar-label');
        if (yesLabel) {
            const icon = yesLabel.textContent.split(' ')[0];
            yesLabel.textContent = `${icon} ${yesPercent}%`;
        }
        if (noLabel) {
            const icon = noLabel.textContent.split(' ')[0];
            noLabel.textContent = `${icon} ${noPercent}%`;
        }
    }, 600);
}

// ========================================
// スムーズスクロール
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// カードアニメーション - スクロールイン効果
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.poll-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ========================================
// セクションタイトルのアニメーション
// ========================================
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateX(-20px)';
    title.style.transition = 'all 0.6s ease';
    sectionObserver.observe(title);
});

// ========================================
// ローディング状態の管理
// ========================================
function showLoading() {
    console.log('読み込み中...');
}

function hideLoading() {
    console.log('読み込み完了');
}

// ========================================
// エラーハンドリング
// ========================================
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.message);
});

// ========================================
// ページ読み込み完了時の処理
// ========================================
window.addEventListener('load', function() {
    console.log('ページの読み込みが完了しました');
    hideLoading();
    
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            header.style.transition = 'all 0.5s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ========================================
// 投票作成依頼ボタン
// ========================================
const createRequestButtons = document.querySelectorAll('.btn-primary, .btn-create-request');

createRequestButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('作成依頼') || this.textContent.includes('依頼フォーム')) {
            e.preventDefault();
            alert('投票作成依頼フォームは現在準備中です。\n近日中に公開予定です。');
        }
    });
});

// ========================================
// ログインボタン
// ========================================
const loginButtons = document.querySelectorAll('.btn-login, .btn-login-mobile, .btn-login-comment');

loginButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('ログイン機能は現在準備中です。\nバックエンド実装後に利用可能になります。');
    });
});

// ========================================
// レスポンシブ対応のチェック
// ========================================
function checkViewport() {
    const width = window.innerWidth;
    if (width < 768) {
        console.log('モバイルビュー');
    } else if (width < 1024) {
        console.log('タブレットビュー');
    } else {
        console.log('デスクトップビュー');
    }
}

window.addEventListener('resize', checkViewport);
checkViewport();

// ========================================
// パフォーマンス最適化
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('みんなの投票サイト - JavaScriptロード完了');
