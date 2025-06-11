import './index.css'
import Slider from 'react-slick'

const UserStories = props => {
  const {storiesList} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {storiesList.map(story => {
        const {userId, userName, storyUrl} = story
        return (
          <div className="slick-item" key={userId}>
            <img className="logo-image" src={storyUrl} alt="user story" />
            <p className="story-user-name">{userName}</p>
          </div>
        )
      })}
    </Slider>
  )
}

export default UserStories
