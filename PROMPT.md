# prompt.md — Patinhas & Cia Pet Shop

> Leia o CLAUDE.md antes de qualquer código.
> Siga todas as convenções: Design (padrões PROIBIDOS) e Animations.

---

## Objetivo

Site portfólio único, animado e com identidade própria. Design original, sem padrões genéricos.

---

## Dados do comércio

- **Nome:** Patinhas & Cia Pet Shop
- **Nicho:** Pet Shop
- **Cidade:** Belo Horizonte, MG
- **Descrição:** Pet shop completo com banho e tosa, venda de rações e acessórios, e consultas veterinárias. Atendimento carinhoso e personalizado para cães e gatos de todas as raças.
- **Instagram:** @patinhasecia.bh
- **WhatsApp:** https://wa.me/5531999990001

---

## Identidade visual

- **Estilo:** Moderno e sofisticado
- **Cor primária:** #2d6a4f → `--color-primary`
- **Cor secundária:** #74c69d → `--color-secondary`
- **Cor acento:** #f4a261 → `--color-accent`
- **Fonte títulos:** Playfair Display → `--font-display`
- **Fonte corpo:** Inter → `--font-body`
- **Logo:** Não tem — criar logotipo tipográfico

---

## Fotos / assets

  - (sem fotos — usar Unsplash via URL)

## Imagens via URL
Usar Unsplash no src (w=1600 hero, w=800 galeria, w=400 cards). Nunca placeholders.

---

## Estrutura de arquivos

```
patinhas-cia-pet-shop/
├── CLAUDE.md
├── .gitignore
├── prompt.md
├── index.html
├── components/
│   ├── simple-anime.js
│   ├── simple-anime.css
│   ├── origin-button.js
│   └── origin-button.css
├── css/
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   └── index.css
├── js/
│   └── main.js
└── assets/
    └── images/
```

---

## Seções e layouts

1. **hero** → Split (texto esq + imagem dir)
2. **servicos** → Accordion expansível
3. **galeria** → Destaque (1 grande + menores)
4. **sobre** → Números em destaque
5. **contato** → Fundo colorido + CTA

---

## Requisitos

- Ler CLAUDE.md antes de qualquer código
- Mobile-first, 100% responsivo
- Cores via CSS custom properties em `css/variables.css`
- Nunca inline styles
- WhatsApp flutuante → https://wa.me/5531999990001
- Google Fonts: Playfair Display + Inter
- Comentários em português

## Animações (obrigatório)

No `<head>`:
```html
<link rel="stylesheet" href="components/simple-anime.css">
<link rel="stylesheet" href="components/origin-button.css">
```

Antes do `</body>`:
```html
<script src="components/simple-anime.js"></script>
<script src="components/origin-button.js"></script>
<script>new SimpleAnime();</script>
```

Adicionar `data-anime` em todos os elementos:
```html
<h1 data-anime="0" class="fadeInUp">Título</h1>
<p data-anime="200" class="fadeInUp">Subtítulo</p>
<button data-anime="400" class="fadeInUp origin-btn origin-btn-primary">CTA</button>
```

| Contexto | Botão |
|---|---|
| CTA principal, agendamento, WhatsApp | `origin-btn origin-btn-primary` |
| Botão secundário, "saiba mais" | `flow-btn` |
| Tema dourado | `origin-btn-gold` ou `flow-btn-gold` |
| Fundo escuro | `flow-btn-white` |

## SEO

```html
<title>Patinhas & Cia Pet Shop — Pet Shop em Belo Horizonte, MG</title>
<meta name="description" content="Pet shop completo com banho e tosa, venda de rações e acessórios, e consultas veterinárias. Atendimento carinhoso e personalizado para cães " >
<meta name="keywords" content="pet shop, Patinhas & Cia Pet Shop">
<meta property="og:title" content="Patinhas & Cia Pet Shop — Pet Shop em Belo Horizonte, MG">
<meta name="theme-color" content="#2d6a4f">
```


---
*Gerado em 06/10/2026 às 19:05*