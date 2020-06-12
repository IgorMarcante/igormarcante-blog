import React from 'react';
import Layout from "../components/Layout"
import SEO from "../components/seo"
import { MainContent } from '../styles/base'


const NotFoundPage = () => (
  <Layout>
    <MainContent>
      <SEO title="404: Not found" />
      <h1>404 - Página não encontrada</h1>
      <p>Ops...não tem nada aqui.</p>
    </MainContent>
  </Layout>
)

export default NotFoundPage
