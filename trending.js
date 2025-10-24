// ========================================
// 人気投票ページ専用のJavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 期間フィルター
    // ========================================
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // すべてのタブからactiveを削除
            filterTabs.forEach(t => t.classList.remove('active'));
            // クリックされたタブにactiveを追加
            this.classList.add('active');
            
            const period = this.getAttribute('data-period');
            console.log('期間フィルター:', period);
            
            // アニメーション効果
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // バックエンド実装後にランキングデータを更新
            // fetchRankingData(period);
        });
    });
    
    // ========================================
    // ランキングアイテムのアニメーション
    // ========================================
    const rankingItems = document.querySelectorAll('.ranking-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    rankingItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // ========================================
    // 表彰台のアニメーション
    // ========================================
    const podiumItems = document.querySelectorAll('.podium-item');
    
    podiumItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
});

console.log('人気投票ページ - JavaScriptロード完了');
