import React from 'react';
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { MainContent } from '../styles/base'

const AboutPage = () => (
  <Layout>
    <SEO
      title="Sobre mim"
      description="Saiba um pouco mais sobre o desenvolvedor por trás deste blog."
    />
    <MainContent>
      <h1>Sobre mim</h1>
      <p>
        Meu nome é Igor Marcante sou natural de Ribeirão Preto-SP, tenho 24 anos e
         cursei Técnico em Informática no Instituto Federal de Rondônia e bacharelado
          em Sistemas de Informação na Faculdade Porto, em Porto Velho - RO.
      </p>
      <p>Iníciei com programação por volta de 12 anos de idade, criando scripts para 
        jogos online que jogava na época (Counter Strike e Tibia), desde então nunca
          mais sai da área de programação. Atualmente trabalho como programador em uma empresa 
          de desenvolvimento de sistemas chamada Softnet e também trabalho com Desenvolvimento de Sistemas 
          no Governo de Rondônia, mais especificamente,
           no Departamento de Estradas de Rodagens(DER).
      </p>
      <p>Gosto de tudo que está relacionado a novas tecnologias voltada a desenvolvimento, tenho interesse em novas 
        ferramentas e linguagens. Minha linguagem principal é o C# (.NET CORE), mas tenho grande interesse na stack ReactJS+ReactNative+NodeJS.</p>
      
      <p>Criei esse blog com o intuito de publicar alguns tutoriais básicos na área de programação, e assuntos aleatórios que
         eu considero legal, como por exemplo desenvolvimento pessoal, produtividade, etc.</p>

      <h2>Habilidades</h2>

      <ul>
        <li>.NET MVC5 e .NET CORE</li>
        <li>Entity Framework</li>
        <li>Laravel(PHP)</li>
        <li>Javascript</li>
        <li>ReactJS</li>
        <li>React Native</li>
        <li>NodeJS</li>
        <li>SQL Server, Postgres, MySql</li>
        <li>CSS Frameworks (Bootstrap, Foundation)</li>
        <li>Git</li>
        <li>Python</li>
        <li>Scrum and Kanban</li>
      </ul>

    </MainContent>
  </Layout>

);

export default AboutPage;
