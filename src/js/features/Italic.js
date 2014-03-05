define(['features/TextFeature'], function (TextFeature) {
  function Feature() {}
  Feature.prototype = Object.create(TextFeature.prototype);
  Feature.prototype.name = 'italic';
  return Feature;
});
