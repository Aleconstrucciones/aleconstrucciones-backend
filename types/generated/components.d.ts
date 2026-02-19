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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'hero-slide.hero-carrousel': HeroSlideHeroCarrousel;
      'value.values': ValueValues;
    }
  }
}
