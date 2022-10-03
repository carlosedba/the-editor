export const select = (size) => ({
  container: (provided, state) => {
    //console.log('container - provided:', provided)

    return {
      ...provided,
      borderColor: state.isFocused ? 'red' : 'green',
    }
  },

  control: (provided, state) => {
    //console.log('control - provided:', provided)

    return {
      ...provided,
      cursor: 'pointer',

      padding: 0,
      minHeight: 50,
      width: size,
      borderRadius: '10px',

      borderColor: state.isFocused ? 'var(--colorLightGray)' : 'var(--colorPlatinum)',
      backgroundColor: '#fff',
      boxShadow: state.isFocused ? null : null,

      fontFamily: 'myriad-pro, sans-serif',

      '&:hover': {
        borderColor: state.isFocused ? 'var(--colorLightGray)' : 'var(--colorPlatinum)',
      },
    }
  },

  valueContainer: (provided, state) => {
    //console.log('group - provided:', provided)

    return {
      ...provided,
      padding: '0 14px',
    }
  },

  option: (provided, state) => {
    //console.log('option - provided:', provided)

    return {
      ...provided,
      cursor: 'pointer',
      fontFamily: 'myriad-pro, sans-serif'
    }
  }
})