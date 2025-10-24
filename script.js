// ========================================
// ティッカー（スクロールメッセージ）の無限ループ
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const tickerContent = document.getElementById('tickerContent');
    
    if (tickerContent) {
        // ティッカーコンテンツを複製して無限スクロールを実現
        const tickerClone = tickerContent.cloneNode(true);
        tickerContent.parentNode.appendChild(tickerClone);
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
        
        // 値をフォーマット
        if (end >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (end >= 1000) {
            element.textContent = (current / 1000).toFixed(1) + 'K';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// 統計情報の初期アニメーション
window.addEventListener('load', function() {
    const totalPollsEl = document.getElementById('totalPolls');
    const totalVotesEl = document.getElementById('totalVotes');
    const activeUsersEl = document.getElementById('activeUsers');
    
    if (totalPollsEl) animateValue(totalPollsEl, 0, 2847, 2000);
    if (totalVotesEl) animateValue(totalVotesEl, 0, 1200000, 2000);
    if (activeUsersEl) animateValue(activeUsersEl, 0, 8432, 2000);
    
    // 定期的に統計を更新（デモ用）
    setInterval(() => {
        if (totalPollsEl) {
            const current = parseInt(totalPollsEl.textContent.replace(/,/g, ''));
            animateValue(totalPollsEl, current, current + Math.floor(Math.random() * 5), 1000);
        }
        if (activeUsersEl) {
            const current = parseInt(activeUsersEl.textContent.replace(/,/g, ''));
            const change = Math.floor(Math.random() * 20) - 10;
            animateValue(activeUsersEl, current, Math.max(0, current + change), 1000);
        }
    }, 5000);
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
            // バックエンド実装後にAJAXリクエストを追加
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
        // すべてのフィルターからactiveを削除
        quickFilters.forEach(f => f.classList.remove('active'));
        // クリックされたフィルターにactiveを追加
        this.classList.add('active');
        
        const filterType = this.getAttribute('data-filter');
        console.log('フィルター:', filterType);
        
        // アニメーション効果
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // バックエンド実装後にフィルタリング処理を追加
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
        
        // メニュー外クリックで閉じる
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
        // すべてのタブからactiveを削除
        categoryTabs.forEach(t => t.classList.remove('active'));
        // クリックされたタブにactiveを追加
        this.classList.add('active');
        
        // ここで投票リストをフィルタリングする処理を追加
        const category = this.textContent;
        console.log('選択されたカテゴリ:', category);
        
        // アニメーション効果
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// ========================================
// 投票カード - ホバー効果
// ========================================
const pollCards = document.querySelectorAll('.poll-card');

pollCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ========================================
// 投票オプション - クリック処理
// ========================================
const pollOptions = document.querySelectorAll('.poll-option');

pollOptions.forEach(option => {
    option.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 投票カードを見つける
        const pollCard = this.closest('.poll-card');
        const pollCardLink = this.closest('.poll-card-link');
        
        // すでに投票済みかチェック
        if (pollCard && pollCard.classList.contains('voted')) {
            alert('すでに投票済みです');
            return;
        }
        
        // 選択された選択肢を取得
        const optionLabel = this.querySelector('.option-label').textContent;
        const isYes = this.classList.contains('poll-option-yes');
        
        // アニメーション効果
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 100);
        
        // 投票処理（バックエンド実装後にAJAXリクエストを追加）
        console.log('投票:', optionLabel, isYes ? 'YES' : 'NO');
        
        // 視覚的フィードバック
        this.style.boxShadow = isYes 
            ? '0 0 0 4px rgba(34, 197, 94, 0.4)' 
            : '0 0 0 4px rgba(239, 68, 68, 0.4)';
        
        setTimeout(() => {
            this.style.boxShadow = '';
            
            // 選択状態を追加
            this.classList.add('selected');
            
            // 投票済みフラグを立てる
            if (pollCard) {
                pollCard.classList.add('voted');
            }
            
            // 投票完了後、詳細ページへ遷移
            if (pollCardLink) {
                window.location.href = pollCardLink.href;
            }
        }, 500);
    });
});

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

// 初期状態を設定してから監視
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
    // ローディングインジケーターを表示
    console.log('読み込み中...');
}

function hideLoading() {
    // ローディングインジケーターを非表示
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
    
    // ヘッダーのアニメーション
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
// 統計情報の更新（デモ用）
// ========================================
function updateStats() {
    const statCounts = document.querySelectorAll('.stat-text');
    statCounts.forEach(stat => {
        // ランダムに統計を更新（バックエンド実装後は実際のデータを使用）
        const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
        if (Math.random() > 0.95) { // 5%の確率で更新
            stat.textContent = (currentValue + 1) + '票';
        }
    });
}

// 10秒ごとに統計を更新（デモ用）
// setInterval(updateStats, 10000);

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
// スクロール位置の保存と復元
// ========================================
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function() {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
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
// 画像の遅延読み込み
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
