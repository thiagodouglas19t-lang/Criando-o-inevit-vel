import { Wifi, Shield, Terminal } from 'lucide-react'

export default function App() {
  return (
    <div style={{padding:20,fontFamily:'sans-serif'}}>
      <h1 style={{color:'#8B5CF6'}}>THKLAYUS HACK PANEL</h1>

      <div style={{display:'grid',gap:20}}>

        <div style={{border:'1px solid #333',padding:20}}>
          <Shield />
          <h2>Segurança</h2>
          <p>Estudar vulnerabilidades do seu app</p>
        </div>

        <div style={{border:'1px solid #333',padding:20}}>
          <Terminal />
          <h2>Programação</h2>
          <p>Executar comandos e aprender código</p>
        </div>

        <div style={{border:'1px solid #333',padding:20}}>
          <Wifi />
          <h2>Rede / TV</h2>
          <p>Testar conexão local e ADB</p>
        </div>

      </div>
    </div>
  )
}