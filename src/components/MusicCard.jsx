import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, name } = this.props;
    return (
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        { name }
        <code data-testid="audio-component">audio</code>
        .
      </audio>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
