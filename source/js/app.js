function showMenu() {
  const menuButtons = document.querySelectorAll('.menu-burger');
  const menuContents = document.querySelectorAll('.menu-js');

  menuButtons.forEach((btn, index) => {
    const menuContent = menuContents[index];

    if (!menuContent) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();

      this.classList.toggle('active');
      menuContent.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
      const isClickMenu = menuContent.contains(e.target);
      const isClickBtn = btn.contains(e.target);

      if (!isClickMenu && !isClickBtn) {
        menuContent.classList.remove('active');
        btn.classList.remove('active');
      }
    });
  });
}


function toggleClamp() {
  const description = document.querySelector('.description');
  description.addEventListener('click', function () {
    this.classList.toggle('expanded');
  });
}

function showMenuMobile() {
  const mainMenu = document.querySelector('.menu-mob-main')
  const subMenu = document.querySelector('.menu-mob-sub')
  const subTitle = document.querySelector('.menu-mob-title')
  const menuTop = document.querySelector('.menu-mob-top')
  const menuBack = document.querySelector('.menu-mob-back')
  const subContent = document.querySelector('.menu-mob-sub-content')

  document.querySelectorAll('[data-section]').forEach(item => {
    const section = item.getAttribute('data-section')
    const subItems = getSubMenuItems(section)

    const hasProducts = Array.isArray(subItems) &&
      subItems.some(i => typeof i === 'object' && i.count > 0)

    if (hasProducts) {
      item.classList.add('has-products')
    }

    item.addEventListener('click', () => {
      const title = item.textContent.trim()
      const items = getSubMenuItems(section)

      if (!items || items.length === 0) return

      mainMenu.classList.add('hidden')
      subMenu.classList.remove('hidden')
      menuTop.classList.add('hidden')
      menuBack.classList.remove('hidden')
      subTitle.textContent = title

      renderSubMenu(items)
    })
  })

  menuBack.addEventListener('click', () => {
    mainMenu.classList.remove('hidden')
    subMenu.classList.add('hidden')
    menuTop.classList.remove('hidden')
    menuBack.classList.add('hidden')
  })

  function getSubMenuItems(section) {
    switch (section) {
      case 'catalog':
        return [
          { name: 'Смартфоны и гаджеты', count: 2, hasSub: false },
          { name: 'Ноутбуки и компьютеры', count: 0, hasSub: false },
          { name: 'Телевизоры и цифровое ТВ', count: 0, hasSub: false },
          { name: 'Аудиотехника', count: 0, hasSub: false },
          { name: 'Акции', count: 0, hasSub: false },
          { name: 'Новинки', count: 0, hasSub: false }
        ]
      case 'hot':
        return [
          { name: 'Горячее предложение', count: 5, hasSub: false }
        ]
      case 'sets':
        return [
          { name: 'Подарочные наборы', count: 3, hasSub: false }
        ]
      case 'events':
        return [
          { name: 'События', count: 2, hasSub: false }
        ]
      default:
        return []
    }
  }

  function renderSubMenu(items) {
    subContent.innerHTML = ''

    items.forEach(item => {
      const li = document.createElement('li')
      li.className = 'menu-item'

      if (item.hasSub && item.section) {
        li.setAttribute('data-section', item.section)
        li.addEventListener('click', () => {
          const nextItems = getSubMenuItems(item.section)
          if (nextItems && nextItems.length > 0) {
            renderSubMenu(nextItems)
          }
        })
      }

      li.innerHTML = `
        <div class="menu-item__box">
          <span class="menu-item__description">${item.name}
            <span class="menu-count">${item.count}</span>
          </span>
        </div>
        ${item.hasSub ? '<span class="menu-arrow">➔</span>' : ''}
      `

      subContent.appendChild(li)
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showMenu()
  toggleClamp()
  showMenuMobile() 
});
