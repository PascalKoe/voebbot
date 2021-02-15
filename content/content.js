const readers = {
  "magazin.spiegel.de": {
    selectors: {
      title: "#articles > article > header h1",
      main: "#articles > article > main .paragraph",
      edition: "body > footer > span.pvi",
      paywall: "#preview"
    },
    provider: "www.munzinger.de"
  },
  "www.spiegel.de": {
    selectors: {
      title: ".leading-tight span:not(:first-child), .leading-none .leading-normal, h2 span:not(:first-child) span:not(:first-child)",
      main: "article section .clearfix",
      mimic: "article section .clearfix .RichText",
      paywall: "div[data-component='Paywall']"
    },
    provider: "www.munzinger.de"
  },
  "plus.tagesspiegel.de": {
    selectors: {
      title: "h1 > span",
      main: ".article--paid",
      paywall: ".article--paid > p:first-child~div",
      date: "time",
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: "TSP,TPCP,TSPO",
    }
  },
  "www.zeit.de": {
    selectors: {
      title: ".article-heading__title, .article-header__title, .headline__title",
      edition: ".zplus-badge__media-item@alt",
      date: ".metadata__source.encoded-date, time",
      paywall: ".gate.article__item",
      main: ".article-page",
      mimic: ".article-page .paragraph"
    },
    start: function (paywall) {
      paywall.style.display = "none"
      document.querySelector('.paragraph.article__item').classList.remove('paragraph--faded')
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: "ZEIT,ZEIO,ZTCS,ZTGS,ZTWI",

    }
  },
  "www.welt.de": {
    selectors: {
      title: "h2.c-headline",
      date: "time",
      paywall: ".contains_walled_content",
      main: ".c-article-text",
    },
    start: function () {
      document.querySelector('.c-page-container.c-la-loading').remove()
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: 'WEPL,WAMS,WELT,WEON',
    }
  },
  "www.sueddeutsche.de": {
    selectors: {
      // title: "article > header > h2 > span:last-child",
      title: () => {
        return document.querySelector('.sz-article-body__paragraph--reduced').innerText.split(' ').slice(0, 8).join(' ')
      },
      date: "time",
      paywall: "offer-page",
      main: "div[itemprop='articleBody']",
      mimic: ".sz-article-body__paragraph"
    },
    start: () => {
      const p = document.querySelector('.sz-article-body__paragraph--reduced')
      if (p) {
        p.className = 'sz-article-body__paragraph'
      }
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: 'SZ',
      searchMask: '5441'
    }
  },
  "www.handelsblatt.com": {
    selectors: {
      title: "span[itemprop='headline']",
      date: "span[itemprop='datePublished']",
      paywall: ".c-paywall",
      main: "div[itemprop='articleBody']",
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: 'HBON',
      searchMask: '6111'
    }
  },
  "www.berliner-zeitung.de": {
    selectors: {
      title: () => {
        return document.querySelector('.a-paragraph span:not(:first-child)').innerText.split(' ').slice(0, 5).join(' ')
      },
      main: '.o-article',
      paywall: '.paywall-dialog-box',
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: 'BEZE',
      searchMask: '5525'
    }
  },
  "www.morgenpost.de": {
    selectors: {
      title: () => {
        return document.querySelector('.article__body p').innerText.split(' ').slice(0, 8).join(' ')
      },
      main: "div[itemprop='articleBody']",
      paywall: '#paywall-container',
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: 'BMP',
      searchMask: '5601'
    }
  },
  "www.nordkurier.de": {
    selectors: {
      title: "article h1",
      main: ".article-content",
      paywall: '.nk-plus-subscription-options-breaker',
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: 'NKU',
    }
  },
  "www.abendblatt.de": {
    selectors: {
      title: "[itemprop='headline']",
      main: ".article__body",
      date: "time",
      paywall: "#paywall-container"
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: 'HA,HABO',
    }
  },
  "www.wiwo.de": {
    selectors: {
      title: ".c-headline--article",
      date: ".o-article__element time",
      paywall: ".o-reco",
      main: ".o-article__content .u-richtext",
    },
    provider: "bib-voebb.genios.de",
    providerParams: {
      dbShortcut: 'WWON',
      searchMask: '5968'
    }
  },
}

const COLOR = '#00b6b5'
const ICON = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='15px' height='20px' version='1.1' viewBox='0 0 15 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg transform='translate(-98.354 -138.46)'%3E%3Cpath d='m109.33 156.88c0.0529 0 0.10584-0.0529 0.10584-0.10584v-0.34395c0-0.0529-0.0529-0.10584-0.10584-0.10584h-8.8106c-0.0529 0-0.10584-0.0529-0.10584-0.10583v-9.5779c0-0.0265 0.0265-0.0794 0.0794-0.10583 0.0529 0 9.8425-3.81 10.716-4.1275 0.0265-0.0265 0.0529 0 0.0529 0.0529v3.4131c0 0.0794 0.0529 0.13229 0.10584 0.13229h0.3175c0.0794 0 0.13229-0.0529 0.13229-0.13229v-4.2069c0-0.0529-0.0265-0.0794-0.10584-0.0529-1.0848 0.42333-11.774 4.5508-11.774 4.5508-0.05292 0.0265-0.07937 0.0529-0.07937 0.10583v10.478c0 0.0529 0.053 0.10881 0.10583 0.10583h9.3662z' fill='%2300b6b5'/%3E%3Crect x='102.12' y='151.59' width='8.5012' height='2.7684' fill='none' stroke='%2300b6b5' stroke-linecap='square' stroke-linejoin='round' stroke-width='.517'/%3E%3Cg%3E%3Cg transform='matrix(.26458 0 0 .26458 90.021 135.28)' fill='none' stroke='%2300b6b5' stroke-width='1.0016'%3E%3Cpath d='m48.769 64.675v4.756z'/%3E%3Cpath d='m51.373 64.675v4.756z'/%3E%3Cpath d='m53.976 64.675v4.756z'/%3E%3Cpath d='m56.579 64.675v4.756z'/%3E%3Cpath d='m59.183 64.675v4.756z'/%3E%3Cpath d='m61.786 64.675v4.756z'/%3E%3Cpath d='m64.39 64.675v4.756z'/%3E%3Cpath d='m66.993 64.675v4.756z'/%3E%3Cpath d='m69.597 64.675v4.756z'/%3E%3Cpath d='m72.2 64.675v4.756z'/%3E%3Cpath d='m74.804 64.675v4.756z'/%3E%3C/g%3E%3Cg transform='matrix(.26458 0 0 .26458 89.275 136.2)' fill='%2300b6b5'%3E%3Ccircle cx='53.566' cy='45.591' r='4.5182' fill='none' stroke='%2300b6b5' stroke-linecap='square' stroke-linejoin='round' stroke-width='1.954'/%3E%3Cpath d='m55.427 45.722a1.941 1.941 0 0 1-1.9279 1.941 1.941 1.941 0 0 1-1.954-1.9148 1.941 1.941 0 0 1 1.9015-1.9668 1.941 1.941 0 0 1 1.9796 1.8882' fill='%2300b6b5'/%3E%3Cg transform='translate(19.762 .64701)'%3E%3Ccircle cx='51.84' cy='44.944' r='4.5182' fill='none' stroke='%2300b6b5' stroke-linecap='square' stroke-linejoin='round' stroke-width='1.954'/%3E%3Cpath d='m53.702 45.075a1.941 1.941 0 0 1-1.9279 1.941 1.941 1.941 0 0 1-1.954-1.9148 1.941 1.941 0 0 1 1.9015-1.9668 1.941 1.941 0 0 1 1.9796 1.8882' fill='%2300b6b5'/%3E%3C/g%3E%3C/g%3E%3Cg transform='matrix(.2521 -.080322 .080322 .2521 89.328 142.29)' stroke='%2300b6b5'%3E%3Ccircle cx='59.093' cy='13.372' r='4.5182' fill='none' stroke-linecap='square' stroke-linejoin='round' stroke-width='1.954'/%3E%3Cpath d='m59.093 25.018v-7.9798z' fill='%2300b6b5' stroke-width='2.8913'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A"
const MESSAGE_ID = 'voebbot-message'


const loader = `
<style>
#voebbot-loading {
animation: voebbot-working 2s ease-in-out 0s infinite;
}

@keyframes voebbot-working {
  0% {
    transform: translate(-60px, 0) rotateY(180deg);
  }

  40% {
    transform: translate(60px, 0) rotateY(180deg) ;
  }

  50% {
    transform: translate(60px, 0) rotateY(0deg) ;
  }

  90% {
    transform: translate(-60px, 0) rotateY(0deg);
  }

  100% {
    transform: translate(-60px, 0) rotateY(180deg);
  }
}
</style>
<div id="voebbot-loader" style="border: 5px solid ${COLOR}; padding: 10px; margin: 20px auto; text-align:center; position:relative">
  <div style="color: ${COLOR}; font-family: sans-serif; font-size: 1.2rem">VÖBBot</div>
  <img id="voebbot-loading" src="${ICON}" alt="VOEBBot" height="40" width="30">
  <div id="${MESSAGE_ID}" style="font-family: sans-serif; font-size: 0.9rem; color: ${COLOR}">Artikel wird gesucht...</div>
</div>`

FAILED_HTML = `<strong>Artikel konnte nicht gefunden werden</strong>
<ul style="text-align:left">
<li>Titel können sich von der Druckausgabe unterscheiden. Nutzen Sie das offene Tab um nach Stichworten zu suchen.</li>
<li>ggf. ist der Artikel exklusiv und nicht über die Bibliothek verfügbar</li>
<li>Artikel aus der gedruckten Ausgabe sind ggf. erst später verfügbar.</li>
</ul>`


var articleInfo = {}
// const port = browser.runtime.connect({name:"port-from-cs"});
// port.onDisconnect.addListener(function(p) {
//   console.log('Port disconnected', p);
// })

function setupReader() {
  for (const key in reader.selectors) {
    if (reader.selectors[key]) {
      const selector = reader.selectors[key]
      if (typeof selector === "function") {
        articleInfo[key] = selector()
      } else {
        const parts = reader.selectors[key].split('@')
        const result = document.querySelector(parts[0])
        if (result === null) {
          articleInfo[key] = ''
          continue
        }
        if (parts[1]) {
          articleInfo[key] = result.attributes[parts[1]].value.trim()
        } else {
          articleInfo[key] = result.textContent.trim()
        }
      }
    }
  }

  const paywall = document.querySelector(reader.selectors.paywall)
  if (paywall === null) {
    return
  }
  console.log('Found paywall', articleInfo)

  if (reader.start) {
    reader.start(paywall)
  } else {
    paywall.style.display = "none"
  }

  const main = document.querySelector(reader.selectors.main)
  main.innerHTML = main.innerHTML + loader

  chrome.runtime.sendMessage({
    "type": "voebb-init",
    "provider": reader.provider,
    "providerParams": reader.providerParams,
    "articleInfo": articleInfo
  }, function finalizeReader (message) {
    console.log(message);
    // if (message.type === 'message') {
    //   document.querySelector(`#${MESSAGE_ID}`).innerText = message.text
    //   return Promise.resolve()
    // }
    document.querySelector('#voebbot-loading').style.display = 'none'
    if (message.type === 'failed') {
      document.querySelector(`#${MESSAGE_ID}`).innerHTML = FAILED_HTML
      paywall.style.display = "block"
      return Promise.resolve()
    }
    let content = message.content.join('')
    if (reader.selectors.mimic) {
      const mimic = document.querySelector(reader.selectors.mimic)
      if (mimic !== null) {
        content = `<div class="${mimic.className}">${content}</div>`
      }
    }
    main.innerHTML = content
    if (reader.cleanup) {
      reader.cleanup()
    }
    return Promise.resolve()
  })

}


const host = document.location.host
const reader = readers[host]

if (reader !== undefined) {
  console.log("setup reader!");

  setupReader()
}