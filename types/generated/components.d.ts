import type { Schema, Struct } from '@strapi/strapi';

export interface HeroSlideHeroCarrousel extends Struct.ComponentSchema {
  collectionName: 'components_hero_slide_hero_carrousels';
  info: {
    displayName: 'heroCarousel';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    order: Schema.Attribute.Integer;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['slogan', 'financing', 'process']>;
  };
}

export interface ValueValues extends Struct.ComponentSchema {
  collectionName: 'components_value_values';
  info: {
    displayName: 'values';
  };
  attributes: {
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface ZeroAccidentSafetyAndHygiene extends Struct.ComponentSchema {
  collectionName: 'components_zero_accident_safety_and_hygienes';
  info: {
    displayName: 'safetyAndHygiene';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ZeroAccidentSafetyCulture extends Struct.ComponentSchema {
  collectionName: 'components_zero_accident_safety_cultures';
  info: {
    displayName: 'safetyCulture';
  };
  attributes: {
    description: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ZeroAccidentSecurityHero extends Struct.ComponentSchema {
  collectionName: 'components_zero_accident_security_heroes';
  info: {
    displayName: 'securityHero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    responsibleMedia: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    responsibleName: Schema.Attribute.String;
    responsibleRole: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ZeroAccidentZeroAccident extends Struct.ComponentSchema {
  collectionName: 'components_zero_accident_zero_accidents';
  info: {
    displayName: 'zeroAccident';
  };
  attributes: {
    safetyAndHygiene: Schema.Attribute.Component<
      'zero-accident.safety-and-hygiene',
      false
    >;
    safetyCulture: Schema.Attribute.Component<
      'zero-accident.safety-culture',
      false
    >;
    securityHero: Schema.Attribute.Component<
      'zero-accident.security-hero',
      false
    >;
    zeroAccidentDefinition: Schema.Attribute.Component<
      'zero-accident.zero-accident-definition',
      false
    >;
  };
}

export interface ZeroAccidentZeroAccidentDefinition
  extends Struct.ComponentSchema {
  collectionName: 'components_zero_accident_zero_accident_definitions';
  info: {
    displayName: 'zeroAccidentDefinition';
  };
  attributes: {
    items: Schema.Attribute.Component<'zero-accident.zero-accident-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ZeroAccidentZeroAccidentItem extends Struct.ComponentSchema {
  collectionName: 'components_zero_accident_zero_accident_items';
  info: {
    displayName: 'zero-accident-item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero-slide.hero-carrousel': HeroSlideHeroCarrousel;
      'value.values': ValueValues;
      'zero-accident.safety-and-hygiene': ZeroAccidentSafetyAndHygiene;
      'zero-accident.safety-culture': ZeroAccidentSafetyCulture;
      'zero-accident.security-hero': ZeroAccidentSecurityHero;
      'zero-accident.zero-accident': ZeroAccidentZeroAccident;
      'zero-accident.zero-accident-definition': ZeroAccidentZeroAccidentDefinition;
      'zero-accident.zero-accident-item': ZeroAccidentZeroAccidentItem;
    }
  }
}
