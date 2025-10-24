// ========================================
// 投票詳細ページ専用のJavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // 投票ボタンの処理
    // ========================================
    const voteButtons = document.querySelectorAll('.vote-btn');
    
    voteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // すでに投票済みかチェック
            if (document.body.classList.contains('voted')) {
                alert('すでに投票済みです');
                return;
            }
            
            const voteLabel = this.querySelector('.vote-label').textContent;
            const isYes = this.classList.contains('vote-btn-yes');
            
            // アニメーション効果
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);
            
            // 投票処理（バックエンド実装後にAJAXリクエストを追加）
            console.log('投票:', voteLabel);
            
            // 視覚的フィードバック
            this.style.boxShadow = isYes 
                ? '0 0 0 4px rgba(34, 197, 94, 0.4)' 
                : '0 0 0 4px rgba(239, 68, 68, 0.4)';
            
            setTimeout(() => {
                this.style.boxShadow = '';
                alert(`「${voteLabel}」に投票しました！\n結果が更新されました。`);
                
                // 選択状態を追加
                this.classList.add('selected');
                
                // 結果セクションまでスクロール
                const resultSection = document.querySelector('.result-section');
                if (resultSection) {
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                
                // 投票済みフラグ
                document.body.classList.add('voted');
                
                // デモ用：結果を更新（実際はバックエンドから取得）
                updateResults(isYes);
            }, 600);
        });
    });
    
    // ========================================
    // 結果の更新（デモ用）
    // ========================================
    function updateResults(votedYes) {
        // 現在の投票数を取得
        const yesBar = document.querySelector('.result-yes .result-bar');
        const noBar = document.querySelector('.result-no .result-bar');
        const totalVotesElement = document.querySelector('.total-votes');
        const yesPercentage = document.querySelector('.result-yes .result-percentage');
        const noPercentage = document.querySelector('.result-no .result-percentage');
        const yesCount = document.querySelector('.result-yes .result-count');
        const noCount = document.querySelector('.result-no .result-count');
        
        // 現在の値を取得
        let currentTotal = parseInt(totalVotesElement.textContent.replace(/[^0-9]/g, ''));
        let currentYesCount = parseInt(yesCount.textContent.replace(/[^0-9]/g, ''));
        let currentNoCount = parseInt(noCount.textContent.replace(/[^0-9]/g, ''));
        
        // 新しい値を計算
        if (votedYes) {
            currentYesCount++;
        } else {
            currentNoCount++;
        }
        currentTotal++;
        
        const newYesPercentage = Math.round((currentYesCount / currentTotal) * 100);
        const newNoPercentage = 100 - newYesPercentage;
        
        // アニメーションで更新
        setTimeout(() => {
            yesBar.style.width = newYesPercentage + '%';
            noBar.style.width = newNoPercentage + '%';
            yesPercentage.textContent = newYesPercentage + '%';
            noPercentage.textContent = newNoPercentage + '%';
            yesCount.textContent = currentYesCount + '票';
            noCount.textContent = currentNoCount + '票';
            totalVotesElement.textContent = `総投票数: ${currentTotal}票`;
            
            // 円グラフも更新
            updatePieChart(newYesPercentage);
        }, 300);
    }
    
    // ========================================
    // 円グラフの更新
    // ========================================
    function updatePieChart(yesPercentage) {
        const piePercentage = document.querySelector('.pie-percentage');
        const pieLabel = document.querySelector('.pie-label');
        
        if (piePercentage) {
            piePercentage.textContent = yesPercentage + '%';
        }
        
        // SVG円グラフの更新
        const circumference = 2 * Math.PI * 90;
        const yesLength = (yesPercentage / 100) * circumference;
        const noLength = circumference - yesLength;
        
        const circles = document.querySelectorAll('.pie-chart circle');
        if (circles.length >= 2) {
            circles[0].setAttribute('stroke-dasharray', `${yesLength} ${circumference}`);
            circles[1].setAttribute('stroke-dasharray', `${noLength} ${circumference}`);
            circles[1].setAttribute('stroke-dashoffset', `-${yesLength}`);
        }
    }
    
    // ========================================
    // コメントフィルター
    // ========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const commentCards = document.querySelectorAll('.comment-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // すべてのボタンからactiveを削除
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // クリックされたボタンにactiveを追加
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // コメントをフィルタリング
            commentCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0)';
                    }, 10);
                } else if (filter === 'yes' && card.classList.contains('comment-yes')) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0)';
                    }, 10);
                } else if (filter === 'no' && card.classList.contains('comment-no')) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateX(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // アニメーション効果
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // ========================================
    // コメントのリアクションボタン
    // ========================================
    const reactionButtons = document.querySelectorAll('.reaction-btn');
    
    reactionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const countElement = this.querySelector('.reaction-count');
            let count = parseInt(countElement.textContent);
            
            // トグル処理（デモ用）
            if (this.classList.contains('reacted')) {
                count--;
                this.classList.remove('reacted');
                this.style.background = 'white';
            } else {
                count++;
                this.classList.add('reacted');
                this.style.background = '#e3f2fd';
                this.style.borderColor = '#0066cc';
            }
            
            countElement.textContent = count;
            
            // アニメーション
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // ========================================
    // 返信ボタン
    // ========================================
    const replyButtons = document.querySelectorAll('.reply-btn');
    
    replyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            alert('返信機能は現在準備中です。\nログイン機能と合わせて実装予定です。');
        });
    });
    
    // ========================================
    // SNS共有ボタン
    // ========================================
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pollTitle = document.querySelector('.poll-detail-title').textContent;
            const currentUrl = window.location.href;
            
            if (this.classList.contains('share-twitter')) {
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pollTitle)}&url=${encodeURIComponent(currentUrl)}`;
                window.open(twitterUrl, '_blank', 'width=550,height=420');
            } else if (this.classList.contains('share-facebook')) {
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                window.open(facebookUrl, '_blank', 'width=550,height=420');
            } else if (this.classList.contains('share-line')) {
                const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}`;
                window.open(lineUrl, '_blank', 'width=550,height=420');
            } else if (this.classList.contains('share-copy')) {
                // URLをクリップボードにコピー
                navigator.clipboard.writeText(currentUrl).then(() => {
                    // 成功フィードバック
                    const originalText = this.innerHTML;
                    this.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> コピーしました！';
                    this.style.background = '#10b981';
                    this.style.color = 'white';
                    this.style.borderColor = '#10b981';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.background = '';
                        this.style.color = '';
                        this.style.borderColor = '';
                    }, 2000);
                }).catch(() => {
                    alert('URLのコピーに失敗しました');
                });
            }
            
            // アニメーション
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // ========================================
    // コメントフォーム処理
    // ========================================
    const commentForm = document.getElementById('commentForm');
    const stanceBtns = document.querySelectorAll('.stance-btn');
    const stanceInput = document.getElementById('stance');
    const commentTextarea = document.getElementById('commentText');
    const charCount = document.getElementById('charCount');
    
    // 立場選択ボタン
    stanceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // すべてのボタンからselectedを削除
            stanceBtns.forEach(b => b.classList.remove('selected'));
            // クリックされたボタンにselectedを追加
            this.classList.add('selected');
            // hidden inputに値を設定
            stanceInput.value = this.getAttribute('data-stance');
            
            // アニメーション
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // 文字数カウント
    if (commentTextarea && charCount) {
        commentTextarea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
    
    // フォーム送信
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nickname = document.getElementById('nickname').value;
            const email = document.getElementById('email').value;
            const stance = stanceInput.value;
            const comment = commentTextarea.value;
            
            // 立場が選択されているかチェック
            if (!stance) {
                alert('賛成か反対のどちらかを選択してください。');
                return;
            }
            
            // バックエンド実装後にAJAXリクエストを送信
            console.log('コメント投稿:', {
                nickname,
                email,
                stance,
                comment
            });
            
            // デモ用：投稿成功メッセージ
            alert('コメントを投稿しました！\n（実際のサイトでは、投稿後にコメント一覧に表示されます）');
            
            // フォームをリセット
            commentForm.reset();
            stanceBtns.forEach(b => b.classList.remove('selected'));
            charCount.textContent = '0';
        });
    }
    
    // ========================================
    // さらに読み込むボタン
    // ========================================
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = '読み込み中...';
            this.disabled = true;
            
            // デモ用：2秒後に完了
            setTimeout(() => {
                alert('これ以上コメントはありません。\n実際のサイトではここで追加のコメントが読み込まれます。');
                this.textContent = 'さらに読み込む';
                this.disabled = false;
            }, 2000);
        });
    }
    
    // ========================================
    // 関連投票アイテムのホバー効果
    // ========================================
    const relatedPollItems = document.querySelectorAll('.related-poll-item');
    
    relatedPollItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ========================================
    // スクロールアニメーション
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 各セクションにアニメーションを適用
    const animatedElements = document.querySelectorAll('.vote-section, .result-section, .share-section, .comments-section, .sidebar-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(element);
    });
    
    // ========================================
    // コメントカードのアニメーション
    // ========================================
    commentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 300);
    });
    
    // ========================================
    // 結果バーのアニメーション
    // ========================================
    const resultBars = document.querySelectorAll('.result-bar');
    
    const barObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 100);
                barObserver.unobserve(bar);
            }
        });
    }, observerOptions);
    
    resultBars.forEach(bar => {
        barObserver.observe(bar);
    });
    
    // ========================================
    // 円グラフの初期アニメーション
    // ========================================
    const pieChart = document.querySelector('.pie-chart');
    
    if (pieChart) {
        const pieObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    pieChart.style.opacity = '0';
                    pieChart.style.transform = 'scale(0.8) rotate(-90deg)';
                    setTimeout(() => {
                        pieChart.style.transition = 'all 1s ease-out';
                        pieChart.style.opacity = '1';
                        pieChart.style.transform = 'scale(1) rotate(0deg)';
                    }, 100);
                    pieObserver.unobserve(pieChart);
                }
            });
        }, observerOptions);
        
        pieObserver.observe(pieChart);
    }
});

console.log('投票詳細ページ - JavaScriptロード完了');
