const icon = (name) => ({ name });
export const items = [
  {
    label: 'Demos',
    content: {
      layout: 'grid',
      columns: 2,
      categories: [
        {
          title: 'Security',
          items: [
            {
              label: 'Web App & API Protection',
              description: 'Deploy an application security demo with Terraform and follow its protection walkthroughs.',
              href: 'https://f5-sales-demo.github.io/webapp-api-protection/en/',
              icon: icon('f5xc:web-app-and-api-protection'),
            },
            {
              label: 'API Protection',
              description: 'Find guides to API discovery, schema validation, and request controls.',
              href: 'https://f5-sales-demo.github.io/api-protection/en/',
              icon: icon('f5xc:application-traffic-insight'),
            },
            {
              label: 'Bot Defense Advanced',
              description: 'Review behavioral bot detection and mitigation scenarios.',
              href: 'https://f5-sales-demo.github.io/bot-advanced/en/',
              icon: icon('f5xc:bot-defense'),
            },
            {
              label: 'Bot Defense Standard',
              description: 'Review bot classification, verified crawlers, and blocking policies.',
              href: 'https://f5-sales-demo.github.io/bot-standard/en/',
              icon: icon('f5xc:bot-defense'),
            },
            {
              label: 'Client-Side Defense',
              description: 'Deploy browser script monitoring with an API or Terraform workflow.',
              href: 'https://f5-sales-demo.github.io/csd/en/',
              icon: icon('f5xc:client-side-defense'),
            },
            {
              label: 'DDoS Mitigation',
              description: 'Review distributed denial-of-service defenses and demo scenarios.',
              href: 'https://f5-sales-demo.github.io/ddos/en/',
              icon: icon('f5xc:ddos-and-transit-services'),
            },
            {
              label: 'Web App Scanning',
              description: 'Find web application vulnerability scanning guides.',
              href: 'https://f5-sales-demo.github.io/was/en/',
              icon: icon('f5xc:web-app-scanning'),
            },
            {
              label: 'Custom responses',
              description: 'Configure application replies, redirects, and security response pages.',
              href: 'https://f5-sales-demo.github.io/custom-responses/en/',
              icon: icon('f5xc:web-app-and-api-protection'),
            },
          ],
        },
        {
          title: 'Networking and performance',
          items: [
            {
              label: 'Multi-Cloud Networking',
              description: 'Find site deployment and cross-cloud connectivity guides.',
              href: 'https://f5-sales-demo.github.io/multi-cloud-networking/en/',
              icon: icon('f5xc:multi-cloud-network-connect'),
            },
            {
              label: 'Canada topology',
              description: 'Deploy Canadian application hosting and demonstrate regional access controls.',
              href: 'https://f5-sales-demo.github.io/canada/en/',
              icon: { asset: 'canada-flag.svg', width: 640, height: 480 },
            },
            {
              label: 'Content Delivery Network',
              description: 'Review content delivery network (CDN) caching and origin configuration.',
              href: 'https://f5-sales-demo.github.io/cdn/en/',
              icon: icon('f5xc:content-delivery-network'),
            },
            {
              label: 'DNS Management',
              description: 'Find Domain Name System (DNS) zone and load balancing guides.',
              href: 'https://f5-sales-demo.github.io/dns/en/',
              icon: icon('f5xc:dns-management'),
            },
            {
              label: 'NGINX One',
              description: 'Review NGINX instance visibility and configuration management.',
              href: 'https://f5-sales-demo.github.io/nginx/en/',
              icon: icon('f5xc:nginx-one'),
            },
          ],
        },
      ],
      footer: {
        label: 'Demo catalog',
        href: 'https://f5-sales-demo.github.io/en/demos/',
        description: 'All demonstration and capability guides',
      },
    },
  },
  {
    label: 'Demo environment',
    content: {
      layout: 'list',
      categories: [
        {
          title: 'Deployment resources',
          items: [
            {
              label: 'Origin server',
              description: 'Compare the Azure full-origin stack with the separate AWS Juice Shop deployment.',
              href: 'https://f5-sales-demo.github.io/origin-server/en/',
              icon: icon('f5xc:distributed-apps'),
            },
            {
              label: 'Traffic generator',
              description:
                'Choose Azure or AWS deployment guides for controlled security traffic and browser scenarios.',
              href: 'https://f5-sales-demo.github.io/traffic-generator/en/',
              icon: icon('f5xc:application-traffic-insight'),
            },
            {
              label: 'CDN simulator',
              description: 'Deploy an Azure proxy that adds CDN headers to origin requests.',
              href: 'https://f5-sales-demo.github.io/cdn-simulator/en/',
              icon: icon('f5xc:content-delivery-network'),
            },
          ],
        },
      ],
      footer: {
        label: 'Demo resource catalog',
        href: 'https://f5-sales-demo.github.io/demo-resources/en/',
        description: 'Azure and AWS offerings vary by component',
      },
    },
  },
  {
    label: 'Operations',
    content: {
      layout: 'list',
      categories: [
        {
          title: 'Queries and administration',
          items: [
            {
              label: 'Statistics',
              description: 'Query access logs, application metrics, and security telemetry through the API.',
              href: 'https://f5-sales-demo.github.io/statistics/en/',
              icon: icon('f5xc:doc'),
            },
            {
              label: 'Observability',
              description: 'Find monitoring, metrics, tracing, and alerting guides.',
              href: 'https://f5-sales-demo.github.io/observability/en/',
              icon: icon('f5xc:observability'),
            },
            {
              label: 'Administration',
              description: 'Find tenant, namespace, and role management guides.',
              href: 'https://f5-sales-demo.github.io/administration/en/',
              icon: icon('f5xc:administration'),
            },
          ],
        },
      ],
    },
  },
  {
    label: 'Developer tools',
    content: {
      layout: 'grid',
      columns: 2,
      categories: [
        {
          title: 'Tools and automation',
          items: [
            {
              label: 'xcsh',
              description:
                'Install the independent terminal assistant for engineering and F5 Distributed Cloud workflows.',
              href: 'https://f5-sales-demo.github.io/xcsh/en/',
              icon: icon('carbon:terminal'),
            },
            {
              label: 'Terraform provider',
              description: 'Configure F5 Distributed Cloud resources with Terraform.',
              href: 'https://f5-sales-demo.github.io/terraform-provider-xcsh/',
              icon: icon('f5xc:doc'),
            },
            {
              label: 'xcsh GitHub Action',
              description: 'Run pinned xcsh manifest operations in GitHub Actions.',
              href: 'https://f5-sales-demo.github.io/xcsh-action/en/',
              icon: icon('carbon:workflow-automation'),
            },
            {
              label: 'VS Code extension',
              description: 'Author manifests and manage F5 Distributed Cloud resources in Visual Studio Code.',
              href: 'https://f5-sales-demo.github.io/vscode-xcsh/en/',
              icon: icon('carbon:code'),
            },
            {
              label: 'xcsh Chrome extension',
              description: 'Connect xcsh to the F5 Distributed Cloud console through a local browser bridge.',
              href: 'https://f5-sales-demo.github.io/xcsh-chrome-extension/en/',
              icon: icon('carbon:application-web'),
            },
            {
              label: 'APT repository',
              description: 'Install signed Debian and Ubuntu packages for xcsh and supporting tools.',
              href: 'https://f5-sales-demo.github.io/apt-repo/en/',
              icon: icon('f5xc:doc'),
            },
          ],
        },
        {
          title: 'Specifications and plugins',
          items: [
            {
              label: 'API specifications',
              description: 'Find validated OpenAPI specifications and the specification update pipeline.',
              href: 'https://f5-sales-demo.github.io/api-specs/en/',
              icon: icon('f5xc:data-intelligence'),
            },
            {
              label: 'Enriched API specifications',
              description: 'Browse OpenAPI schemas with additional constraints and examples.',
              href: 'https://f5-sales-demo.github.io/api-specs-enriched/en/',
              icon: icon('f5xc:data-intelligence'),
            },
            {
              label: 'xcsh marketplace',
              description: 'Find xcsh plugins for documentation, sales, cloud, security, and desktop work.',
              href: 'https://f5-sales-demo.github.io/marketplace/en/',
              icon: icon('f5xc:ai_assistant_logo'),
            },
            {
              label: 'Marketplace for Claude Code',
              description: 'Find Language Server Protocol integrations and developer tools for Claude Code.',
              href: 'https://f5-sales-demo.github.io/marketplace-claude-code/en/',
              icon: icon('f5xc:doc'),
            },
            {
              label: 'Console catalog',
              description: 'Browse documented console routes and browser automation workflows.',
              href: 'https://f5-sales-demo.github.io/console/en/',
              icon: icon('f5xc:ai_assistant_logo'),
            },
          ],
        },
      ],
    },
  },
  {
    label: 'Ecosystem',
    content: {
      layout: 'list',
      categories: [
        {
          title: 'Public projects',
          items: [
            {
              label: 'F5 documentation corpus',
              description: 'Browse curated F5 documentation and its Markdown sources.',
              href: 'https://f5-sales-demo.github.io/html-to-markdown/',
              icon: icon('f5xc:doc'),
            },
            {
              label: 'Ecosystem directory',
              description: 'Browse documentation, tools, and public project sources',
              href: 'https://f5-sales-demo.github.io/en/ecosystem/',
              icon: icon('f5xc:doc'),
            },
          ],
        },
      ],
      footer: {
        label: 'Project sources',
        href: 'https://github.com/f5-sales-demo',
        description: 'Public repositories in the community organization',
      },
    },
  },
  {
    label: 'F5 services',
    content: {
      layout: 'list',
      categories: [
        {
          title: 'Official documentation and services',
          items: [
            {
              label: 'F5 Distributed Cloud console',
              description: 'Management service; sign-in required',
              href: 'https://console.ves.volterra.io',
              icon: icon('f5xc:platform'),
            },
            {
              label: 'F5 Distributed Cloud documentation',
              description: 'Official public product documentation',
              href: 'https://docs.cloud.f5.com',
              icon: icon('f5xc:doc'),
            },
            {
              label: 'MyF5 support',
              description: 'Support portal; sign-in required for account services',
              href: 'https://my.f5.com/manage/s/',
              icon: icon('f5xc:support'),
            },
          ],
        },
      ],
    },
  },
];
