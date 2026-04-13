import { useState, useEffect, useCallback } from "react";
import logoGuri from "@/assets/logo-guri.png";

const WHATSAPP_LINK = "https://wa.me/554299222222?text=Olá!%20Quero%20participar%20do%20grupo%20Copa%202026%20🏆";
const GROUP_LINK = "https://chat.whatsapp.com/LINK-DO-GRUPO";

const modais: Record<string, { icon: string; title: string; desc: string }> = {
  album: { icon: "📒", title: "Reservar Álbum Oficial", desc: "Álbum da Copa 2026 com 3 figurinhas incluídas por R$ 19,90 na pré-venda. Faça seu cadastro abaixo!" },
  basico: { icon: "🎴", title: "Reservar Pacote Básico", desc: "3 envelopes com 5 figurinhas cada por R$ 12,00. Cadastre-se e garanta o seu!" },
  kit: { icon: "🎁", title: "Reservar Kit Colecionador", desc: "Álbum + 10 envelopes + figurinha brilhante especial por R$ 49,90. Faça sua reserva!" },
  box: { icon: "📦", title: "Reservar Box Família", desc: "2 álbuns + 25 envelopes por R$ 89,90. Perfeito para toda a família! Cadastre-se abaixo." },
};

function useCountdown() {
  const [time, setTime] = useState({ d: "--", h: "--", m: "--", s: "--" });
  useEffect(() => {
    const copa = new Date("2026-06-11T12:00:00").getTime();
    const update = () => {
      const diff = copa - Date.now();
      if (diff <= 0) return;
      setTime({
        d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, "0"),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Index = () => {
  const countdown = useCountdown();
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [anuncioOk, setAnuncioOk] = useState(false);
  const [tipoAnuncio, setTipoAnuncio] = useState("oferta");

  const modal = modalOpen ? modais[modalOpen] : null;

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  }, []);

  const handleAnuncio = useCallback(() => {
    setAnuncioOk(true);
    setTimeout(() => setAnuncioOk(false), 4000);
  }, []);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* FLOATING WHATSAPP */}
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-7 right-6 z-[999] w-[58px] h-[58px] rounded-full flex items-center justify-center text-[1.6rem] no-underline animate-pulse-whats"
        style={{ background: "#25D366", color: "#fff", boxShadow: "0 6px 24px rgba(37,211,102,.5)" }}
        title="Falar no WhatsApp">💬</a>

      {/* PANINI BAR */}
      <div className="text-center py-2 px-5" style={{ background: "hsl(var(--verde))" }}>
        <p className="font-oswald text-sm tracking-wider font-semibold uppercase flex items-center justify-center gap-2" style={{ color: "#fff" }}>
          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full tracking-wide" style={{ background: "#fff", color: "hsl(152,100%,31%)" }}>⭐ OFICIAL</span>
          Representante Autorizado PANINI no município de Turvo · PR
          <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full tracking-wide" style={{ background: "#fff", color: "hsl(152,100%,31%)" }}>🏆 PANINI</span>
        </p>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-[100] py-3.5" style={{ background: "linear-gradient(90deg, hsl(152,100%,31%) 0%, #007d2f 50%, hsl(218,100%,23%) 100%)", boxShadow: "0 4px 20px rgba(0,0,0,.3)" }}>
        <div className="max-w-[1100px] mx-auto px-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoGuri} alt="Sorvetes Guri" className="w-[52px] h-[52px] rounded-full object-cover shrink-0" />
            <div className="leading-tight">
              <span className="block font-bebas text-2xl tracking-wider" style={{ color: "hsl(var(--amarelo))" }}>Sorvetes Guri</span>
              <span className="block text-[.72rem] font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,.7)" }}>Turvo · Copa 2026 🏆</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-1.5 flex-wrap">
            {[["#prevenda","Pré-venda"],["#cadastro","Cadastro"],["#whatsapp","WhatsApp"],["#diatrocas","Dia de Trocas"],["#troca","Mural"]].map(([href,label]) => (
              <a key={href} href={href} className="px-3.5 py-2 rounded-full text-[.85rem] font-bold tracking-wide uppercase no-underline transition-all hover:bg-white/15" style={{ color: "rgba(255,255,255,.85)" }}>{label}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* COUNTDOWN */}
      <div className="text-center py-4 px-5" style={{ background: "hsl(var(--amarelo))" }}>
        <p className="font-oswald text-lg font-bold tracking-wide" style={{ color: "hsl(var(--azul))" }}>⏳ Copa do Mundo 2026 começa em</p>
        <div className="inline-flex gap-4 items-center mt-1.5">
          {[["d","Dias"],["h","Horas"],["m","Min"],["s","Seg"]].map(([key,label], i) => (
            <div key={key} className="flex items-center gap-4">
              {i > 0 && <span className="font-bebas text-[2rem]" style={{ color: "hsl(var(--azul))" }}>:</span>}
              <div className="text-center">
                <span className="block font-bebas text-[2.4rem] leading-none" style={{ color: "hsl(var(--azul))" }}>{countdown[key as keyof typeof countdown]}</span>
                <small className="text-[.7rem] uppercase tracking-wide font-bold" style={{ color: "rgba(0,39,118,.7)" }}>{label}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden text-center py-20 px-5 md:py-20 md:pb-24" style={{ background: "linear-gradient(135deg, hsl(152,100%,31%) 0%, #007d2f 35%, hsl(218,100%,23%) 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        {/* Floating balls */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[30px] left-[5%] w-[160px] h-[160px] rounded-full border-2 animate-float" style={{ background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.1)" }} />
          <div className="absolute bottom-5 right-[8%] w-[100px] h-[100px] rounded-full border-2 animate-float" style={{ background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.1)", animationDelay: "2s" }} />
          <div className="absolute top-[40%] -left-10 w-20 h-20 rounded-full border-2 animate-float" style={{ background: "rgba(255,255,255,.06)", borderColor: "rgba(255,255,255,.1)", animationDelay: "4s" }} />
        </div>
        <div className="relative max-w-[1100px] mx-auto">
          <div className="inline-block rounded-full px-5 py-1.5 mb-5 font-oswald text-[.85rem] tracking-wider font-bold uppercase" style={{ background: "hsl(var(--amarelo))", color: "hsl(var(--azul))" }}>🏆 Pré-venda Exclusiva • Copa 2026</div>
          <div className="inline-block rounded-full px-4 py-1.5 mb-4 font-oswald text-[.8rem] tracking-wider font-semibold uppercase" style={{ background: "rgba(255,255,255,.15)", border: "2px solid rgba(255,255,255,.3)", color: "#fff" }}>⭐ Representante Oficial PANINI em Turvo</div>
          <h1 className="font-bebas text-[clamp(3rem,8vw,6rem)] leading-[.95] mb-4 tracking-wider" style={{ color: "#fff" }}>
            FIGURINHAS <span style={{ color: "hsl(var(--amarelo))" }}>COPA</span><br />DO MUNDO 2026
          </h1>
          <p className="text-lg font-semibold leading-relaxed max-w-[600px] mx-auto mb-9" style={{ color: "rgba(255,255,255,.85)" }}>
            Complete seu álbum, troque com amigos e viva a Copa com a gente! Cadastre-se para garantir seu álbum e pacotes de figurinhas na pré-venda com desconto exclusivo. 🇧🇷
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <a href="#cadastro" className="btn-copa btn-amarelo">📝 Quero me Cadastrar</a>
            <a href="#diatrocas" className="btn-copa btn-verde">🏟️ Dia de Trocas na Praça</a>
            <a href="#whatsapp" className="btn-copa btn-whats">💬 Entrar no Grupo</a>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-5" style={{ background: "linear-gradient(135deg, hsl(152,100%,31%) 0%, #006b28 100%)" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block font-oswald text-[.8rem] tracking-wider uppercase px-4 py-1 rounded-full mb-3 font-semibold" style={{ background: "#fff3b0", color: "#8a6000" }}>🎯 Como Funciona</span>
          <h2 className="font-bebas text-[clamp(2rem,5vw,3.2rem)] tracking-wide mb-3" style={{ color: "hsl(var(--amarelo))" }}>SIMPLES ASSIM!</h2>
          <p className="text-base max-w-[600px] mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,.8)" }}>Em 4 passos você já está participando de tudo.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: 1, t: "Cadastre-se", d: "Preencha o formulário abaixo com seus dados e escolha o que quer reservar na pré-venda." },
              { n: 2, t: "Entre no Grupo", d: "Acesse o grupo do WhatsApp e fique por dentro de tudo: novidades, sorteios e trocas." },
              { n: 3, t: "Retire na Loja", d: "Quando chegar seu pedido, avisamos no WhatsApp. É só vir retirar aqui na Sorvetes Guri!" },
              { n: 4, t: "Troque Aqui", d: "Anuncie suas repetidas e encontre quem tem o que você precisa. Tudo pelo site!" },
            ].map(s => (
              <div key={s.n} className="text-center py-7 px-5">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bebas text-3xl mx-auto mb-3.5" style={{ background: "hsl(var(--amarelo))", color: "hsl(var(--azul))", boxShadow: "0 4px 16px rgba(255,223,0,.4)" }}>{s.n}</div>
                <h3 className="font-oswald text-base font-bold mb-2" style={{ color: "#fff" }}>{s.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,.7)" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÉ-VENDA */}
      <section id="prevenda" className="py-20 px-5" style={{ background: "#f8fff9" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block font-oswald text-[.8rem] tracking-wider uppercase px-4 py-1 rounded-full mb-3 font-semibold" style={{ background: "#d4f7e3", color: "hsl(152,100%,31%)" }}>🛒 Pré-venda</span>
          <h2 className="font-bebas text-[clamp(2rem,5vw,3.2rem)] tracking-wide mb-3" style={{ color: "hsl(var(--azul))" }}>GARANTA O SEU COM DESCONTO!</h2>
          <p className="text-base max-w-[600px] mb-8 leading-relaxed" style={{ color: "#555" }}>Produtos com preço especial para quem se cadastrar agora. Estoque limitado!</p>
          
          <div className="inline-flex items-center gap-2.5 rounded-xl px-5 py-3 mb-7" style={{ background: "#e8f7ef", border: "2px solid hsl(152,100%,31%)" }}>
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-oswald text-base font-bold tracking-wide m-0" style={{ color: "hsl(152,100%,31%)" }}>REPRESENTANTE OFICIAL PANINI</p>
              <p className="text-[.8rem] m-0" style={{ color: "#555" }}>Produtos originais e lacrados direto da distribuidora Panini</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { key: "album", badge: "⭐ Mais Pedido", icon: "📒", name: "Álbum Oficial Copa 2026", price: "R$ 19,90", sub: "pré-venda", desc: "Álbum completo com capa dura e todas as seções dos países participantes. Edição especial com 3 figurinhas incluídas.", btnClass: "btn-verde", destaque: true },
              { key: "basico", icon: "🎴", name: "Pacote Básico", price: "R$ 12,00", sub: "/ 3 envelopes", desc: "3 envelopes com 5 figurinhas cada. Perfeito pra começar ou complementar sua coleção.", btnClass: "btn-verde" },
              { key: "kit", icon: "🎁", name: "Kit Colecionador", price: "R$ 49,90", sub: "/ kit", desc: "Álbum + 10 envelopes de figurinhas + 1 figurinha especial brilhante por apenas R$ 49,90.", btnClass: "btn-amarelo" },
              { key: "box", icon: "📦", name: "Box Família", price: "R$ 89,90", sub: "/ box", desc: "2 álbuns + 25 envelopes. Ideal para pais e filhos completarem juntos!", btnClass: "btn-azul" },
            ].map(p => (
              <div key={p.key} className={`rounded-[20px] p-7 text-center transition-all relative overflow-hidden border-2 hover:-translate-y-1 hover:shadow-lg ${p.destaque ? "border-yellow-400" : "border-gray-200 hover:border-green-500"}`} style={p.destaque ? { background: "linear-gradient(135deg,#fffde7,#fff9c4)" } : { background: "#fff" }}>
                {p.badge && <div className="absolute top-4 right-4 text-[.7rem] font-extrabold tracking-wide uppercase px-2.5 py-1 rounded-full" style={{ background: "hsl(var(--laranja))", color: "#fff" }}>{p.badge}</div>}
                <div className="text-[3.5rem] mb-3">{p.icon}</div>
                <h3 className="font-oswald text-xl font-bold mb-1.5" style={{ color: "hsl(var(--azul))" }}>{p.name}</h3>
                <div className="font-bebas text-[2rem] my-2.5" style={{ color: "hsl(152,100%,31%)" }}>{p.price} <small className="text-base font-sans font-semibold" style={{ color: "#888" }}>{p.sub}</small></div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#666" }}>{p.desc}</p>
                <button className={`btn-copa ${p.btnClass}`} onClick={() => setModalOpen(p.key)}>Reservar</button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm" style={{ color: "#888" }}>⚠️ A reserva garante sua preferência. O pagamento é feito na retirada na loja.</p>
        </div>
      </section>

      {/* CADASTRO */}
      <section id="cadastro" className="py-20 px-5" style={{ background: "linear-gradient(135deg, hsl(152,100%,31%) 0%, #005e22 60%, hsl(218,100%,23%) 100%)", color: "#fff" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block font-oswald text-[.8rem] tracking-wider uppercase px-4 py-1 rounded-full mb-3 font-semibold" style={{ background: "#fff3b0", color: "#8a6000" }}>📝 Pré-venda</span>
          <h2 className="font-bebas text-[clamp(2rem,5vw,3.2rem)] tracking-wide mb-3" style={{ color: "hsl(var(--amarelo))" }}>FAÇA SEU CADASTRO</h2>
          <p className="text-base max-w-[600px] mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,.8)" }}>Reserve seu álbum e figurinhas com antecedência. Você será avisado pelo WhatsApp quando chegar!</p>

          <div className="rounded-3xl p-6 md:p-10 max-w-[680px]" style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", backdropFilter: "blur(10px)" }}>
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm" style={{ color: "rgba(255,255,255,.9)" }}>👤 Nome Completo *</label>
                    <input type="text" placeholder="Seu nome" required className="px-4 py-3.5 rounded-xl border-2 text-base outline-none transition-colors" style={{ borderColor: "rgba(255,255,255,.15)", background: "rgba(255,255,255,.1)", color: "#fff" }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm" style={{ color: "rgba(255,255,255,.9)" }}>📱 WhatsApp *</label>
                    <input type="tel" placeholder="(42) 9 9999-9999" required className="px-4 py-3.5 rounded-xl border-2 text-base outline-none transition-colors" style={{ borderColor: "rgba(255,255,255,.15)", background: "rgba(255,255,255,.1)", color: "#fff" }} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm" style={{ color: "rgba(255,255,255,.9)" }}>📧 E-mail</label>
                    <input type="email" placeholder="seu@email.com" className="px-4 py-3.5 rounded-xl border-2 text-base outline-none transition-colors" style={{ borderColor: "rgba(255,255,255,.15)", background: "rgba(255,255,255,.1)", color: "#fff" }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-sm" style={{ color: "rgba(255,255,255,.9)" }}>🏠 Bairro (em Turvo)</label>
                    <input type="text" placeholder="Seu bairro" className="px-4 py-3.5 rounded-xl border-2 text-base outline-none transition-colors" style={{ borderColor: "rgba(255,255,255,.15)", background: "rgba(255,255,255,.1)", color: "#fff" }} />
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <label className="font-bold text-sm" style={{ color: "rgba(255,255,255,.9)" }}>🛒 O que deseja reservar? *</label>
                  <div className="flex flex-col gap-2.5">
                    {[
                      ["album", "📒 Álbum Oficial Copa 2026 — R$ 19,90"],
                      ["basico", "🎴 Pacote Básico (3 envelopes) — R$ 12,00"],
                      ["kit", "🎁 Kit Colecionador (álbum + 10 env.) — R$ 49,90"],
                      ["box", "📦 Box Família (2 álbuns + 25 env.) — R$ 89,90"],
                    ].map(([val, label]) => (
                      <label key={val} className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" name="produto" value={val} className="w-[18px] h-[18px]" style={{ accentColor: "hsl(var(--amarelo))" }} />
                        <span className="text-[.95rem]" style={{ color: "rgba(255,255,255,.85)" }}>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <label className="font-bold text-sm" style={{ color: "rgba(255,255,255,.9)" }}>💬 Entrar no grupo do WhatsApp?</label>
                  <select className="px-4 py-3.5 rounded-xl border-2 text-base outline-none" style={{ borderColor: "rgba(255,255,255,.15)", background: "rgba(255,255,255,.1)", color: "#fff" }}>
                    <option value="sim" style={{ background: "hsl(218,100%,23%)" }}>✅ Sim, quero entrar no grupo!</option>
                    <option value="nao" style={{ background: "hsl(218,100%,23%)" }}>Não, obrigado</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 mb-4">
                  <label className="font-bold text-sm" style={{ color: "rgba(255,255,255,.9)" }}>📝 Alguma observação?</label>
                  <textarea placeholder="Ex: quero comprar mais de 1 álbum, tenho dúvidas sobre entrega..." className="px-4 py-3.5 rounded-xl border-2 text-base outline-none resize-y min-h-[80px]" style={{ borderColor: "rgba(255,255,255,.15)", background: "rgba(255,255,255,.1)", color: "#fff" }} />
                </div>

                <button type="submit" className="btn-copa btn-amarelo w-full text-lg py-4 mt-2">✅ Confirmar Meu Cadastro</button>
              </form>
            ) : (
              <div className="rounded-2xl p-6 text-center" style={{ background: "rgba(37,211,102,.15)", border: "2px solid #25D366" }}>
                <h3 className="font-oswald text-xl mb-1.5" style={{ color: "#25D366" }}>🎉 Cadastro Confirmado!</h3>
                <p className="text-[.95rem]" style={{ color: "rgba(255,255,255,.8)" }}>Oba! Em breve você receberá uma mensagem no WhatsApp com todos os detalhes da sua reserva. Fique de olho!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHATSAPP */}
      <section id="whatsapp" className="py-20 px-5" style={{ background: "hsl(var(--creme))" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block font-oswald text-[.8rem] tracking-wider uppercase px-4 py-1 rounded-full mb-3 font-semibold" style={{ background: "#d4f5e0", color: "#075e35" }}>💬 Comunidade</span>
          <h2 className="font-bebas text-[clamp(2rem,5vw,3.2rem)] tracking-wide mb-3" style={{ color: "hsl(var(--azul))" }}>GRUPO OFICIAL NO WHATSAPP</h2>
          <p className="text-base max-w-[600px] mb-8 leading-relaxed" style={{ color: "#555" }}>Entre para o grupo e fique por dentro de tudo sobre a Copa e as figurinhas!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center rounded-3xl p-10 max-w-[900px]" style={{ background: "#fff", boxShadow: "0 8px 40px rgba(0,0,0,.08)" }}>
            <div className="rounded-[20px] p-7 text-center" style={{ background: "linear-gradient(135deg,#075e35,#128c7e)", color: "#fff" }}>
              <div className="text-[4rem] mb-3">💬</div>
              <h3 className="font-bebas text-3xl tracking-wide mb-2">Grupo Copa 2026 Guri</h3>
              <p className="text-sm opacity-85 leading-relaxed mb-5">Mais de 200 colecionadores de Turvo e região já participam!</p>
              <ul className="list-none mb-5 text-left">
                {["Novidades sobre lançamentos","Trocas direto no grupo","Sorteios e promoções exclusivas","Avisos de chegada de pedidos","Dicas para completar o álbum"].map(t => (
                  <li key={t} className="flex items-center gap-2.5 mb-3 font-bold text-[.95rem]">✅ {t}</li>
                ))}
              </ul>
              <a href={GROUP_LINK} target="_blank" rel="noopener noreferrer" className="btn-copa btn-whats w-full block text-center">Entrar no Grupo Agora 🚀</a>
            </div>
            <div>
              <h3 className="font-bebas text-3xl mb-3" style={{ color: "hsl(var(--azul))" }}>POR QUE ENTRAR?</h3>
              <p className="mb-5 leading-relaxed" style={{ color: "#555" }}>Nosso grupo é o ponto de encontro de todos os colecionadores de Turvo. Você será o primeiro a saber quando as figurinhas chegarem, vai poder fazer trocas antes de todo mundo e ainda concorrer a sorteios especiais!</p>
              <div className="rounded-2xl p-5 mb-4" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
                <p className="font-extrabold mb-1.5" style={{ color: "hsl(152,100%,31%)" }}>🎁 BÔNUS DE BOAS-VINDAS</p>
                <p className="text-sm" style={{ color: "#555" }}>Ao entrar no grupo, você concorre a <strong>1 envelope de figurinhas grátis</strong> sorteado toda semana!</p>
              </div>
              <a href={GROUP_LINK} target="_blank" rel="noopener noreferrer" className="btn-copa btn-whats">💬 Quero Entrar no Grupo</a>
            </div>
          </div>
        </div>
      </section>

      {/* DIA DE TROCAS */}
      <section id="diatrocas" className="py-20 px-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(var(--amarelo)) 0%, #ffc800 100%)" }}>
        <div className="absolute -top-5 -right-7 text-[180px] opacity-[.07] rotate-[15deg] pointer-events-none">🎴</div>
        <div className="absolute -bottom-5 -left-5 text-[140px] opacity-[.07] -rotate-[10deg] pointer-events-none">🔄</div>
        <div className="max-w-[1100px] mx-auto relative">
          <span className="inline-block font-oswald text-[.8rem] tracking-wider uppercase px-4 py-1 rounded-full mb-3 font-semibold" style={{ background: "rgba(0,39,118,.12)", color: "hsl(var(--azul))" }}>📅 Evento Presencial</span>
          <h2 className="font-bebas text-[clamp(2rem,5vw,3.2rem)] tracking-wide mb-3" style={{ color: "hsl(var(--azul))" }}>DIA DE TROCAS NA PRAÇA!</h2>
          <p className="text-base max-w-[600px] mb-8 leading-relaxed" style={{ color: "rgba(0,39,118,.75)" }}>Venha pessoalmente trocar suas figurinhas com outros colecionadores da cidade. Um evento especial para toda a família!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Evento card */}
            <div className="rounded-[28px] overflow-hidden" style={{ background: "#fff", boxShadow: "0 20px 60px rgba(0,39,118,.18)" }}>
              <div className="flex items-center gap-4 px-7 py-6" style={{ background: "hsl(var(--azul))" }}>
                <div className="text-[2.4rem]">🏟️</div>
                <div>
                  <h3 className="font-bebas text-[1.7rem] tracking-wide leading-tight" style={{ color: "#fff" }}>Encontro de Colecionadores</h3>
                  <p className="text-[.78rem] font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,.65)" }}>Praça 31 de Outubro · Turvo · PR</p>
                </div>
              </div>
              <div className="p-7 flex flex-col gap-3.5">
                {[
                  { icon: "📍", bg: "#dce8ff", t: "Local", d: <>Praça 31 de Outubro, anexo à <strong style={{ color: "hsl(152,100%,31%)" }}>Sorvetes Guri</strong><br />Turvo · Paraná</> },
                  { icon: "📅", bg: "#fff3b0", t: "Data do Próximo Evento", d: <>A definir — <strong style={{ color: "hsl(152,100%,31%)" }}>fique de olho no grupo do WhatsApp!</strong><br />Eventos acontecerão regularmente durante a Copa.</> },
                  { icon: "🕐", bg: "#e8f7ef", t: "Horário", d: <>A partir das <strong style={{ color: "hsl(152,100%,31%)" }}>14h até as 18h</strong><br />Entrada gratuita para toda a família 🎉</> },
                  { icon: "🍦", bg: "#ffe8d4", t: "Sorvetes Guri no Evento", d: <>Aproveite para tomar um sorvete e sair com suas figurinhas faltando! <strong style={{ color: "hsl(152,100%,31%)" }}>Desconto especial no dia para participantes.</strong></> },
                ].map(r => (
                  <div key={r.t} className="flex items-start gap-3.5 pb-3.5 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: r.bg }}>{r.icon}</div>
                    <div>
                      <h4 className="font-extrabold text-[.95rem] mb-0.5">{r.t}</h4>
                      <p className="text-[.85rem] leading-relaxed" style={{ color: "#666" }}>{r.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info side */}
            <div className="flex flex-col gap-5">
              <div className="rounded-[20px] p-6" style={{ background: "rgba(255,255,255,.4)", border: "2px solid rgba(0,39,118,.15)" }}>
                <h3 className="font-oswald text-xl font-bold mb-2.5" style={{ color: "hsl(var(--azul))" }}>📋 Como Participar?</h3>
                <ul className="list-none flex flex-col gap-2 mt-1.5">
                  {["Traga suas figurinhas repetidas organizadas","Anote quais você ainda precisa para facilitar","As trocas são 1 por 1 (combinado entre as partes)","Vendas e negociações também são permitidas","Crianças bem-vindas com acompanhante","Entrada e participação totalmente gratuitas"].map(r => (
                    <li key={r} className="flex items-start gap-2 text-sm font-semibold" style={{ color: "rgba(0,39,118,.85)" }}>✅ {r}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[20px] p-6" style={{ background: "rgba(255,255,255,.4)", border: "2px solid rgba(0,39,118,.15)" }}>
                <h3 className="font-oswald text-xl font-bold mb-2.5" style={{ color: "hsl(var(--azul))" }}>💡 Dicas para o Dia</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(0,39,118,.8)" }}>Venha com seu álbum para conferir na hora quais figurinhas ainda faltam. Quanto mais organizado você vier, mais trocas consegue fazer!</p>
              </div>
              <div className="rounded-[20px] p-6 text-center" style={{ background: "hsl(var(--azul))" }}>
                <p className="text-[.8rem] uppercase tracking-wider font-bold mb-1.5" style={{ color: "rgba(255,255,255,.65)" }}>📢 Fique sabendo da próxima data</p>
                <h3 className="font-bebas text-[2.4rem] tracking-wide leading-none mb-1" style={{ color: "hsl(var(--amarelo))" }}>ENTRE NO GRUPO</h3>
                <span className="text-sm font-semibold" style={{ color: "rgba(255,255,255,.7)" }}>Anunciamos as datas lá primeiro!</span>
                <a href={GROUP_LINK} target="_blank" rel="noopener noreferrer" className="block mt-3.5 font-oswald font-bold text-base tracking-wide uppercase no-underline px-6 py-3 rounded-full transition-all hover:-translate-y-0.5" style={{ background: "hsl(var(--amarelo))", color: "hsl(var(--azul))" }}>💬 Me Avise no WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MURAL DE TROCAS */}
      <section id="troca" className="py-20 px-5" style={{ background: "#f0fdf4" }}>
        <div className="max-w-[1100px] mx-auto">
          <span className="inline-block font-oswald text-[.8rem] tracking-wider uppercase px-4 py-1 rounded-full mb-3 font-semibold" style={{ background: "#dce8ff", color: "hsl(var(--azul))" }}>🔄 Troca</span>
          <h2 className="font-bebas text-[clamp(2rem,5vw,3.2rem)] tracking-wide mb-3" style={{ color: "hsl(var(--azul))" }}>MURAL DE TROCAS</h2>
          <p className="text-base max-w-[600px] mb-8 leading-relaxed" style={{ color: "#555" }}>Anuncie suas repetidas e encontre quem tem o que você precisa. Grátis e fácil!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">
            {/* Ofertas */}
            <div className="rounded-[20px] p-7" style={{ background: "hsl(var(--creme))" }}>
              <h3 className="font-oswald text-xl font-bold mb-4 pb-3 border-b-2 border-gray-200" style={{ color: "hsl(152,100%,31%)" }}>📤 Tenho pra Dar / Vender</h3>
              {[
                { n: "47", t: "Figurinha Nº 47 — Brasil", w: "(42) 9 9999-****", q: "✅ Tenho 3 repetidas" },
                { n: "112", t: "Figurinha Nº 112 — Argentina", w: "(42) 9 8888-****", q: "✅ Tenho 2 repetidas" },
                { n: "⭐", t: "Figurinha Brilhante — Neymar", w: "(42) 9 7777-****", q: "✅ Tenho 1 — R$ 5,00" },
              ].map(s => (
                <div key={s.t} className="flex items-center gap-3.5 rounded-xl p-4 mb-3 border-2 border-gray-200 transition-colors hover:border-green-500" style={{ background: "#fff" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bebas text-xl shrink-0" style={{ background: "linear-gradient(135deg, hsl(var(--amarelo)), hsl(var(--laranja)))", color: "hsl(var(--azul))" }}>{s.n}</div>
                  <div>
                    <h4 className="font-extrabold text-[.95rem] mb-0.5">{s.t}</h4>
                    <p className="text-[.8rem]" style={{ color: "#888" }}>WhatsApp: {s.w}</p>
                    <span className="inline-block text-[.72rem] font-bold px-2 py-0.5 rounded-lg mt-1" style={{ background: "#e8f7ef", color: "hsl(152,100%,31%)" }}>{s.q}</span>
                  </div>
                </div>
              ))}
              <p className="text-center text-[.82rem] mt-2" style={{ color: "#aaa" }}>← Anúncios reais aparecerão aqui</p>
            </div>

            {/* Buscas */}
            <div className="rounded-[20px] p-7" style={{ background: "hsl(var(--creme))" }}>
              <h3 className="font-oswald text-xl font-bold mb-4 pb-3 border-b-2 border-gray-200" style={{ color: "hsl(var(--azul))" }}>📥 Preciso / Estou Buscando</h3>
              {[
                { n: "88", t: "Figurinha Nº 88 — Portugal", w: "(42) 9 6666-****", q: "🔍 Busco essa figurinha" },
                { n: "203", t: "Figurinha Nº 203 — França", w: "(42) 9 5555-****", q: "🔍 Busco essa figurinha" },
                { n: "⭐", t: "Qualquer Brilhante do Brasil", w: "(42) 9 4444-****", q: "🔍 Pago até R$ 8,00" },
              ].map(s => (
                <div key={s.t} className="flex items-center gap-3.5 rounded-xl p-4 mb-3 border-2 border-gray-200 transition-colors hover:border-green-500" style={{ background: "#fff" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bebas text-xl shrink-0" style={{ background: "linear-gradient(135deg, hsl(var(--amarelo)), hsl(var(--laranja)))", color: "hsl(var(--azul))" }}>{s.n}</div>
                  <div>
                    <h4 className="font-extrabold text-[.95rem] mb-0.5">{s.t}</h4>
                    <p className="text-[.8rem]" style={{ color: "#888" }}>WhatsApp: {s.w}</p>
                    <span className="inline-block text-[.72rem] font-bold px-2 py-0.5 rounded-lg mt-1" style={{ background: "#dce8ff", color: "hsl(var(--azul))" }}>{s.q}</span>
                  </div>
                </div>
              ))}
              <p className="text-center text-[.82rem] mt-2" style={{ color: "#aaa" }}>← Anúncios reais aparecerão aqui</p>
            </div>
          </div>

          {/* Formulário anúncio */}
          <div className="rounded-3xl p-6 md:p-9 max-w-[700px]" style={{ background: "hsl(var(--creme))", border: "2px solid #e8e8e8" }}>
            <h3 className="font-oswald text-2xl font-bold mb-1.5" style={{ color: "hsl(var(--azul))" }}>📢 Anunciar Figurinha</h3>
            <p className="text-sm mb-6" style={{ color: "#666" }}>Preencha abaixo e seu anúncio aparecerá no mural para toda a comunidade ver!</p>

            <div className="flex gap-3 flex-wrap mb-5">
              {[["oferta","📤","Tenho pra Dar"],["busca","📥","Estou Buscando"],["venda","💰","Quero Vender"]].map(([val,icon,label]) => (
                <button key={val} onClick={() => setTipoAnuncio(val)} className={`flex-1 min-w-[120px] p-3 rounded-xl border-2 text-center transition-all font-bold ${tipoAnuncio === val ? "border-green-500" : "border-gray-200 hover:border-green-500"}`} style={tipoAnuncio === val ? { background: "#e8f7ef", color: "hsl(152,100%,31%)" } : { background: "#fff" }}>
                  <span className="block text-xl mb-1">{icon}</span>{label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm">Seu Nome *</label>
                <input type="text" placeholder="João Silva" className="px-4 py-3 rounded-lg border-2 border-gray-200 text-[.95rem] outline-none focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm">WhatsApp *</label>
                <input type="tel" placeholder="(42) 9 9999-9999" className="px-4 py-3 rounded-lg border-2 border-gray-200 text-[.95rem] outline-none focus:border-green-500 transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm">Nº da Figurinha *</label>
                <input type="text" placeholder="Ex: 47, 112, 203" className="px-4 py-3 rounded-lg border-2 border-gray-200 text-[.95rem] outline-none focus:border-green-500 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-bold text-sm">País / Seleção</label>
                <input type="text" placeholder="Ex: Brasil, Portugal" className="px-4 py-3 rounded-lg border-2 border-gray-200 text-[.95rem] outline-none focus:border-green-500 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="font-bold text-sm">Detalhes (quantidade, valor, condição...)</label>
              <textarea placeholder="Ex: Tenho 3 repetidas da nº 47. Aceito troca pela nº 88 ou 203." className="px-4 py-3 rounded-lg border-2 border-gray-200 text-[.95rem] outline-none focus:border-green-500 transition-colors resize-y min-h-[80px]" />
            </div>
            <button className="btn-copa btn-verde w-full" onClick={handleAnuncio}>📢 Publicar Anúncio Grátis</button>
            {anuncioOk && (
              <div className="mt-3.5 rounded-xl p-4 text-center" style={{ background: "#e8f7ef" }}>
                <p className="font-extrabold" style={{ color: "hsl(152,100%,31%)" }}>✅ Anúncio enviado! Será publicado no mural em breve.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-12 px-5" style={{ background: "hsl(var(--dark))", color: "rgba(255,255,255,.7)" }}>
        <div className="font-bebas text-3xl tracking-wider mb-1.5 flex items-center justify-center gap-2" style={{ color: "hsl(var(--amarelo))" }}><img src={logoGuri} alt="Sorvetes Guri" className="w-10 h-10 rounded-full object-cover" /> Sorvetes Guri</div>
        <div className="text-[.85rem] mb-5" style={{ color: "rgba(255,255,255,.4)" }}>Representante Oficial PANINI · Turvo · Paraná · Copa 2026 🏆</div>
        <div className="flex justify-center gap-5 flex-wrap mb-6">
          {[["#prevenda","Pré-venda"],["#cadastro","Cadastro"],["#whatsapp","WhatsApp"],["#diatrocas","Dia de Trocas"],["#troca","Mural de Trocas"]].map(([h,l]) => (
            <a key={h} href={h} className="text-[.85rem] font-semibold no-underline transition-colors hover:text-yellow-400" style={{ color: "rgba(255,255,255,.6)" }}>{l}</a>
          ))}
        </div>
        <div className="text-[.78rem]" style={{ color: "rgba(255,255,255,.3)" }}>© 2026 Sorvetes Guri Turvo · Representante Oficial Panini · Todos os direitos reservados</div>
      </footer>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-5" style={{ background: "rgba(0,0,0,.6)" }} onClick={() => setModalOpen(null)}>
          <div className="rounded-3xl p-10 max-w-[460px] w-full text-center relative animate-slide-up" style={{ background: "#fff" }} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-5 bg-transparent border-none text-xl cursor-pointer" style={{ color: "#aaa" }} onClick={() => setModalOpen(null)}>✕</button>
            <div className="text-5xl mb-3">{modal.icon}</div>
            <h3 className="font-bebas text-3xl mb-2" style={{ color: "hsl(var(--azul))" }}>{modal.title}</h3>
            <p className="leading-relaxed mb-6" style={{ color: "#555" }}>{modal.desc}</p>
            <a href="#cadastro" className="btn-copa btn-verde block" onClick={() => setModalOpen(null)}>Ir para o Cadastro ↓</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
