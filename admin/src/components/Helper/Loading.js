import React from 'react'
import ReactLoading from 'react-loading'

export const Loading = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={'200px'} width={'200px'} className="loading" />
)

export const loadingTimer = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
