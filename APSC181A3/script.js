document.addEventListener("DOMContentLoaded", () => {
  // 1. 高亮当前导航链接
  const currentPath = window.location.pathname.split("/").pop().toLowerCase();
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(link => {
      const href = link.getAttribute("href").toLowerCase();
      if (href === currentPath) {
          link.classList.add("active");
      } else {
          link.classList.remove("active");
      }
  });

  // 2. 页面加载时滚动到顶部（可选）
  window.scrollTo({ top: 0, behavior: "smooth" });

  // 3. 上一页/下一页按钮功能
  // 定义页面顺序数组，根据项目实际情况调整
  const pages = ['introduction.html', 'mechanics.html', 'tutorial.html', 'skills.html', 'extras.html', 'reference.html'];
  const currentIndex = pages.indexOf(currentPath);
  const validIndex = currentIndex !== -1 ? currentIndex : 0;
  const prevPage = validIndex > 0 ? pages[validIndex - 1] : pages[pages.length - 1];
  const nextPage = validIndex < pages.length - 1 ? pages[validIndex + 1] : pages[0];

  const prevBtn = document.getElementById('prevTopic');
  const nextBtn = document.getElementById('nextTopic');

  if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = prevPage;
      });
  }
  if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.href = nextPage;
      });
  }

  // 4. Intersection Observer：当左下角图标出现在屏幕中时触发旋转入场动画
  const cornerImage = document.querySelector('.with-corner-image .corner-image');
  if (cornerImage) {
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // 当图标进入可视范围时，加上动画类
                  cornerImage.classList.add('animate-on-scroll');
                  // 加上后停止观察，防止重复触发
                  observer.unobserve(entry.target);
              }
          });
      }, {
          threshold: 0.1  // 当至少10%可见时触发
      });
      observer.observe(cornerImage);
  }

  const homeArea = document.getElementById('homeArea'); // 假设你给整个 home 页面容器加了 id="homeArea"
  if (homeArea) {
    homeArea.addEventListener('click', function(e) {
      // 可根据需要阻止默认行为
      e.preventDefault();
      window.location.href = 'introduction.html';
    });
  }
});
