import { useMemo, useState } from 'react'

const familyMothers = ['Mãe', 'Vó', 'Tia', 'Madrinha', 'Prima', 'Irmã', 'Sogra']

const blessings = [
  'Que Deus renove suas forças e coloque paz no seu coração.',
  'Que sua casa seja coberta de amor, sabedoria e proteção.',
  'Que sua fé continue iluminando a nossa família.',
  'Que todo cuidado que você entrega volte em forma de bênção.',
]

const quiz = [
  { question: 'Qual superpoder mais combina com uma mãe da nossa família?', options: ['Multiplicar amor', 'Achar tudo perdido', 'Curar com conselho', 'Perceber tudo sem ninguém falar'], answer: 'Todas estão certas 😭 Mãe tem um pouco de cada superpoder.' },
  { question: 'Na filosofia da família, mãe é...', options: ['Raiz', 'Casa', 'Cuidado', 'Tudo isso junto'], answer: 'Tudo isso junto: raiz, casa, cuidado e oração.' },
]

const cards = [
  { title: 'Bênção', icon: '🙏', text: 'Que o Senhor fortaleça seu coração e guie seus passos com paz.' },
  { title: 'Gratidão', icon: '🌷', text: 'Seu amor fez diferença até nos momentos que ninguém viu.' },
  { title: 'Descanso', icon: '🌙', text: 'Você também merece cuidado. Quem cuida tanto também precisa ser cuidada.' },
  { title: 'Alegria', icon: '✨', text: 'Que Deus transforme seu dia em sorriso sincero e coração leve.' },
]

export default function App() {
  const [started, setStarted] = useState(false)
  const [slide, setSlide] = useState(0)
  const [person, setPerson] = useState('Mãe')
  const [blessingIndex, setBlessingIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [selectedCard, setSelectedCard] = useState(cards[0])

  const slides = useMemo(() => [
    {
      eyebrow: 'Abertura',
      title: 'Feliz Dia das Mães',
      content: <><p className="slide-text">Mães são uma das maiores bênçãos da nossa vida. Elas carregam amor quando a gente ainda nem entende o mundo, e sustentam a família com cuidado, fé e presença.</p><p className="verse">“O amor tudo sofre, tudo crê, tudo espera, tudo suporta.” — 1 Coríntios 13:7</p></>,
    },
    {
      eyebrow: 'Família',
      title: 'Onde existe mãe, existe casa',
      content: <><p className="slide-text">Uma família não é feita só de sobrenome. É feita de gente que cuida, perdoa, ora, ensina e permanece. E muitas vezes, esse coração começa em uma mãe.</p><p className="small-note">Mãe é raiz, abrigo e oração em forma de gente.</p></>,
    },
    {
      eyebrow: 'Reflexão',
      title: `${person} é presença de Deus`,
      content: <><p className="slide-text">{person}, seu amor não é pequeno. Ele aparece nos detalhes: na preocupação, no conselho, no cuidado silencioso e na força de continuar mesmo cansada.</p><p className="small-note">O mundo chama isso de rotina. A família chama de amor.</p></>,
    },
    {
      eyebrow: 'Palavra de fé',
      title: 'Uma bênção para hoje',
      content: <><div className="blessing">{blessings[blessingIndex]}</div><button className="primary small" onClick={() => setBlessingIndex((blessingIndex + 1) % blessings.length)}>Sortear outra bênção 🙏</button></>,
    },
    {
      eyebrow: 'Brincadeira',
      title: 'Quiz das mães da família',
      content: <><p className="question">{quiz[quizIndex].question}</p><div className="option-grid">{quiz[quizIndex].options.map((option) => <button className="option" key={option} onClick={() => setAnswer(quiz[quizIndex].answer)}>{option}</button>)}</div>{answer && <div className="answer">{answer}</div>}<button className="ghost full" onClick={() => { setAnswer(''); setQuizIndex((quizIndex + 1) % quiz.length) }}>Nova pergunta</button></>,
    },
    {
      eyebrow: 'Interativo',
      title: 'Escolha uma carta',
      content: <><p className="small-note">Toque em uma carta para receber uma mensagem.</p><div className="card-grid">{cards.map((card) => <button key={card.title} onClick={() => setSelectedCard(card)} className={`gift-card ${selectedCard.title === card.title ? 'active' : ''}`}><span>{card.icon}</span><strong>{card.title}</strong></button>)}</div><div className="answer soft">{selectedCard.text}</div></>,
    },
    {
      eyebrow: 'Mensagem final',
      title: 'Com amor e gratidão',
      content: <><p className="slide-text">Que Deus recompense cada cuidado silencioso, cada oração feita no secreto e cada gesto de amor que sustentou nossa família.</p><p className="small-note">Mãe e família são presentes que a gente não mede em dinheiro. Mede em memória, cuidado e amor.</p><div className="final-box">Feliz Dia das Mães ❤️</div></>,
    },
  ], [person, blessingIndex, quizIndex, answer, selectedCard])

  const progress = Math.round(((slide + 1) / slides.length) * 100)

  if (!started) {
    return <main className="page"><Background /><section className="deck cover"><p className="eyebrow">Presente digital</p><h1>Amor em Código</h1><p className="cover-text">Uma apresentação interativa com carinho, fé, reflexão e brincadeiras para as mães da nossa família.</p><div className="chips">{familyMothers.map((item) => <button key={item} onClick={() => setPerson(item)} className={person === item ? 'chip active' : 'chip'}>{item}</button>)}</div><button className="primary" onClick={() => setStarted(true)}>Começar homenagem 🌸</button></section></main>
  }

  return <main className="page"><Background /><section className="deck"><div className="top"><div><p className="eyebrow">{slides[slide].eyebrow}</p><h2>{slides[slide].title}</h2></div><span className="counter">{slide + 1}/{slides.length}</span></div><div className="bar"><div style={{ width: `${progress}%` }} /></div><div className="slide-body">{slides[slide].content}</div><div className="nav"><button className="ghost" disabled={slide === 0} onClick={() => setSlide(slide - 1)}>Voltar</button><button className="primary" onClick={() => setSlide(Math.min(slides.length - 1, slide + 1))}>{slide === slides.length - 1 ? 'Finalizar ❤️' : 'Continuar'}</button></div></section></main>
}

function Background() {
  return <><div className="bg" /><div className="grid-bg" />{Array.from({ length: 14 }).map((_, i) => <span key={i} className="heart" style={{ left: `${(i * 13) % 100}%`, animationDelay: `${i * .8}s`, animationDuration: `${10 + (i % 5)}s` }}>{i % 3 === 0 ? '🙏' : '🌸'}</span>)}</>
}
