const fs = require('fs');

const generateShadows = (n) => {
  let shadows = [];
  for(let i=0; i<n; i++) {
    shadows.push(`${Math.floor(Math.random()*2000)}px ${Math.floor(Math.random()*2000)}px #fff`);
  }
  return shadows.join(',\n    ');
};

const shadow1 = generateShadows(700);
const shadow2 = generateShadows(200);
const shadow3 = generateShadows(100);

const css = `
.starsContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow:
    ${shadow1};
  animation: animStar 50s linear infinite;
}

.stars::after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow:
    ${shadow1};
}

.stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow:
    ${shadow2};
  animation: animStar 100s linear infinite;
}

.stars2::after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow:
    ${shadow2};
}

.stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow:
    ${shadow3};
  animation: animStar 150s linear infinite;
}

.stars3::after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow:
    ${shadow3};
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
`;

fs.writeFileSync('d:/authentication_system/client/src/components/StarBackground.module.css', css);
console.log('Done!');
