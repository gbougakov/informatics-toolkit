module.exports = id => {
  const langs = {
    3: 'cpp',
    27: 'py'
  }

  return langs[id] || 'txt'
}