define(['features/TextFeature'], function (TextFeature) {
  function BoldFeature() {}
  BoldFeature.prototype = Object.create(TextFeature.prototype);
  BoldFeature.prototype.name = 'bold';
  return BoldFeature;
});
