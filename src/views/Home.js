import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const slides = [
  {
    coverImg: require("../assets/soda.jpg"),
    item: {
      name: "Soda",
      link: "",
      price: 49.99,
      img: require("../assets/soda.jpg"),
    },
  },
  {
    coverImg: require("../assets/spirits.jpg"),
    item: {
      name: "Spirits",
      link: "",
      price: 49.99,
      img: require("../assets/Vodka.jpg"),
    },
  },
  {
    coverImg: require("../assets/winecat.jpg"),
    item: {
      name: "Wine & Champagne",
      link: "",
      price: 49.99,
      img: require("../assets/A-Touch-Of-Love.jpg"),
    },
  },
  {
    coverImg: require("../assets/beer.jpg"),
    item: {
      name: "Beer",
      link: "",
      price: 49.99,
      img: require("../assets/beercover.jpg"),
    },
  },
  {
    coverImg: require("../assets/cover.jpg"),
    item: {
      name: "Chocolate & Gifts",
      link: "",
      price: 149.0,
      img: require("../assets/A-Touch-Of-Love.jpg"),
    },
  },
];

slides.reverse();
const Home = styled.div`
  --height: 100vh;
  height: var(--height);
  &:before {
    display: block;
    content: "";
    height: 70px;
    background: #fff;
    width: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
  }
  .slider {
    /* transition: transform 0.8s ease-in-out; */
  }
  section {
    height: var(--height);
  }
  section .content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transform: scale(0.95);
    transition: transform 0.5s ease-in-out;
  }

  section.active .content {
    transform: scale(1);
  }

  section .content .cover,
  section .content .item {
    height: 100%;
    flex: 1;
  }
  section .content .cover {
    display: none;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  section .content .item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  section .content .item .item__content {
    height: 350px;
    width: 300px;
    position: relative;
    top: -20px;

    transition: transform 0.5s ease-in-out;
  }

  section .content .item .contentitem__details {
    position: absolute;
  }
  section .content .item .name {
    font-size: 2rem;
  }
  section .content .item .price {
    font-size: 1.5rem;
  }
  section .content .item img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  .button-link {
    text-transform: capitalize;
    border-bottom: 2px solid #000;
    font-weight: bold;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    overflow: hidden;
    &:before {
      display: none;
    }
    .slider {
      height: 100%;
      transition: transform 0.8s ease-in-out;
    }

    section .content .cover {
      display: block;
    }
    section .content .item .item__content {
      height: 300px;
      width: 250px;
      top: -20px;
      left: 0px;
    }

    section .content .item .item__content .item__details {
      bottom: -40px;
      left: -40px;
    }
  }
  @media (min-width: 1200px) {
    margin-top: 0px;
    --height: calc(100vh - 0px);
    overflow: hidden;

    section .content .cover {
      display: block;
    }

    section .content .item .item__content .name {
      font-size: 1.6rem;
      max-width: 250px;
    }
    section .content .item .item__content .item__details {
      bottom: -20px;
      left: -40px;
    }
    section .content .item .item__content {
      height: 350px;
      width: 300px;
      top: -20px;
    }
  }
`;

export default () => {
  const containerRef = useRef(null);
  const idx = useRef(0);

  const isAnimating = useRef(false);
  const slideElements = useRef(null);
  // let slideElements = null;

  function slide(dir) {
    let toIdx = null;
    if (dir === "next" && idx.current < slides.length - 1) {
      idx.current = idx.current + 1;
      toIdx = idx.current;
    } else if (dir === "prev" && idx.current > 0) {
      idx.current = idx.current - 1;
      toIdx = idx.current;
    }
    if (toIdx == null) {
      return;
    }
    isAnimating.current = true;
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${toIdx * 100}%)`;
    }
  }

  function handleMouseWheel(e) {
    if (e.currentTarget.innerWidth < 1024) return;
    if (!isAnimating.current && e.deltaY > 0) {
      slide("next");
    } else if (!isAnimating.current && e.deltaY < 0) {
      slide("prev");
    }
  }

  function handleResize(e) {
    containerRef.current.style.transform = `translateY(0)`;
  }

  useEffect(() => {
    slideElements.current = containerRef.current?.querySelectorAll("section");
    window.addEventListener("mousewheel", handleMouseWheel, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousewheel", handleMouseWheel);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <Home>
      <div
        className="slider"
        ref={containerRef}
        onTransitionEnd={(e) => {
          isAnimating.current = false;
          slideElements.current.forEach((el, i) => {
            el.classList.remove("active");
            if (idx.current === i) {
              el.classList.add("active");
            }
          });
        }}
      >
        {slides.map((slide, i) => (
          <section
            key={slide.item.name}
            className={`${i === 0 ? "active" : ""}`}
          >
            <div className="content">
              <div className="item">
                <div className="item__content">
                  <img src={slide.item.img} alt={slide.item.name} />
                  <div className="item__details">
                    <h2 className="name">{slide.item.name}</h2>
                    <Link to={slide.item.link} className="button-link">
                      view Category
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className="cover"
                style={{ backgroundImage: `url(${slide.coverImg})` }}
              ></div>
            </div>
          </section>
        ))}
      </div>
    </Home>
  );
};
