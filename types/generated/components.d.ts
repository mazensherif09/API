import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutAbout extends Schema.Component {
  collectionName: 'components_about_abouts';
  info: {
    displayName: 'about';
  };
  attributes: {
    title: Attribute.String;
    poster: Attribute.Media;
    cards: Attribute.Component<'cards.cards', true>;
  };
}

export interface AnalysisAnalysis extends Schema.Component {
  collectionName: 'components_analysis_analyses';
  info: {
    displayName: 'analysis';
  };
  attributes: {
    phases: Attribute.Component<'phases.phases', true>;
  };
}

export interface CardsCards extends Schema.Component {
  collectionName: 'components_cards_cards';
  info: {
    displayName: 'cards';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface ContactUsContactUs extends Schema.Component {
  collectionName: 'components_contact_us_contact_uses';
  info: {
    displayName: 'contact_us';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    loaction: Attribute.String;
    email: Attribute.Email;
    telepone: Attribute.String;
  };
}

export interface DataData extends Schema.Component {
  collectionName: 'components_data_data';
  info: {
    displayName: 'data';
    description: '';
  };
  attributes: {
    label: Attribute.String;
    value: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 100;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    color: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
  };
}

export interface ItemsItems extends Schema.Component {
  collectionName: 'components_items_items';
  info: {
    displayName: 'items';
  };
  attributes: {
    QTY: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    product: Attribute.Relation<
      'items.items',
      'oneToOne',
      'api::product.product'
    >;
  };
}

export interface LandingLanding extends Schema.Component {
  collectionName: 'components_landing_landings';
  info: {
    displayName: 'landing';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    first_line: Attribute.String;
    second_line: Attribute.String;
    main_adderss: Attribute.String;
    main_network: Attribute.String;
    potser: Attribute.Media;
    company_name: Attribute.String;
  };
}

export interface MtsInfoMtsInfo extends Schema.Component {
  collectionName: 'components_mts_info_mts_infos';
  info: {
    displayName: 'mts_info';
    description: '';
  };
  attributes: {
    stage: Attribute.Integer;
    stage_state: Attribute.Enumeration<['pending', 'completed']>;
    mts_USD: Attribute.Float;
    mts_USDT: Attribute.Float;
    bonus_percentage: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 100;
        },
        number
      >;
  };
}

export interface PhasesPhases extends Schema.Component {
  collectionName: 'components_phases_phases';
  info: {
    displayName: 'phases';
  };
  attributes: {
    name: Attribute.String;
    data: Attribute.Component<'data.data', true>;
  };
}

export interface RoadmapRoadmap extends Schema.Component {
  collectionName: 'components_roadmap_roadmaps';
  info: {
    displayName: 'roadmap';
  };
  attributes: {
    cards: Attribute.Component<'cards.cards', true>;
  };
}

export interface SalesSales extends Schema.Component {
  collectionName: 'components_sales_sales';
  info: {
    displayName: 'sales';
  };
  attributes: {
    sales: Attribute.Component<'cards.cards', true>;
  };
}

export interface TotalTokenSalesTotalTokenSales extends Schema.Component {
  collectionName: 'components_total_token_sales_total_token_sales';
  info: {
    displayName: 'total_token_sales';
    description: '';
  };
  attributes: {
    total_token: Attribute.Integer;
    raised_amount: Attribute.Integer;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about.about': AboutAbout;
      'analysis.analysis': AnalysisAnalysis;
      'cards.cards': CardsCards;
      'contact-us.contact-us': ContactUsContactUs;
      'data.data': DataData;
      'items.items': ItemsItems;
      'landing.landing': LandingLanding;
      'mts-info.mts-info': MtsInfoMtsInfo;
      'phases.phases': PhasesPhases;
      'roadmap.roadmap': RoadmapRoadmap;
      'sales.sales': SalesSales;
      'total-token-sales.total-token-sales': TotalTokenSalesTotalTokenSales;
    }
  }
}
