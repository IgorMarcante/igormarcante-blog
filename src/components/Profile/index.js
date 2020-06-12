import React from 'react'
import { useStaticQuery, graphql } from 'gatsby';

import Avatar from '../Avatar'

import * as S from './styled'
import getThemeColor from '../../utils/getThemeColor'

const Profile = () => {
  const {
    site: {
      siteMetadata: { title, position, description }
    },
  } = useStaticQuery(graphql`
        query MySiteMetadata {
          site {
            siteMetadata {
              description
              position
              title
            }
          }
        }
`)

  return (
    <S.ProfileWrapper>
      <S.ProfileLink to="/" cover direction="left" bg={getThemeColor()} duration={0.6}>
        <Avatar />
        <S.ProfileAuthor>{title}
          <S.ProfilePositon>{position}</S.ProfilePositon>
        </S.ProfileAuthor>

        <S.ProfileDescription>{description}</S.ProfileDescription>
      </S.ProfileLink>
    </S.ProfileWrapper>
  )
}

export default Profile;