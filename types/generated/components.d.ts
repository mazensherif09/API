import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutAbout extends Schema.Component {
  collectionName: 'components_about_abouts';
  info: {
    displayName: 'about';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    poster: Attribute.Media;
    cards: Attribute.Component<'cards.cards', true> &
      Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
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

export interface BestDealsBD extends Schema.Component {
  collectionName: 'components_best_deals_b_ds';
  info: {
    displayName: 'B_D';
    description: '';
  };
  attributes: {
    products: Attribute.Relation<
      'best-deals.b-d',
      'oneToMany',
      'api::product.product'
    >;
  };
}

export interface BestDealsBestDealsSection extends Schema.Component {
  collectionName: 'components_best_deals_section';
  info: {
    displayName: 'BestDeals_section';
  };
  attributes: {
    products: Attribute.Relation<
      'best-deals.best-deals-section',
      'oneToMany',
      'api::product.product'
    >;
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

export interface CategoriesCategories extends Schema.Component {
  collectionName: 'components_categories_categories';
  info: {
    displayName: 'categories';
  };
  attributes: {
    publish: Attribute.Boolean & Attribute.DefaultTo<false>;
    categories: Attribute.Relation<
      'categories.categories',
      'oneToMany',
      'api::category.category'
    >;
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

export interface PostersPosters extends Schema.Component {
  collectionName: 'components_posters_posters';
  info: {
    displayName: 'posters';
    description: '';
  };
  attributes: {
    category: Attribute.Relation<
      'posters.posters',
      'oneToOne',
      'api::category.category'
    >;
    title: Attribute.String;
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

export interface SalesSectionSalesSection extends Schema.Component {
  collectionName: 'components_sales_section_sales_sections';
  info: {
    displayName: 'sales_section';
    description: '';
  };
  attributes: {
    salescards: Attribute.Component<'salescards.salescards', true>;
    publish: Attribute.Boolean & Attribute.DefaultTo<false>;
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

export interface SalescardsSales extends Schema.Component {
  collectionName: 'components_salescards_sales';
  info: {
    displayName: 'sales';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    icon: Attribute.Media;
  };
}

export interface SalescardsSalescards extends Schema.Component {
  collectionName: 'components_salescards_salescards';
  info: {
    displayName: 'salescards';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    icon: Attribute.Media & Attribute.Required;
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
      'best-deals.b-d': BestDealsBD;
      'best-deals.best-deals-section': BestDealsBestDealsSection;
      'cards.cards': CardsCards;
      'categories.categories': CategoriesCategories;
      'contact-us.contact-us': ContactUsContactUs;
      'data.data': DataData;
      'items.items': ItemsItems;
      'landing.landing': LandingLanding;
      'mts-info.mts-info': MtsInfoMtsInfo;
      'phases.phases': PhasesPhases;
      'posters.posters': PostersPosters;
      'roadmap.roadmap': RoadmapRoadmap;
      'sales-section.sales-section': SalesSectionSalesSection;
      'sales.sales': SalesSales;
      'salescards.sales': SalescardsSales;
      'salescards.salescards': SalescardsSalescards;
      'total-token-sales.total-token-sales': TotalTokenSalesTotalTokenSales;
    }
  }
}
