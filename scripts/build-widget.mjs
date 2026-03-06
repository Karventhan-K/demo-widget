import * as esbuild from 'esbuild';
import stylePlugin from 'esbuild-style-plugin';
import { resolve } from 'path';

// Define the widget directory
const widgetDir = resolve('.');

try {
    console.log('🏗️  Building Agenty Chat Widget Embed...');

    await esbuild.build({
        entryPoints: [resolve(widgetDir, 'components/WidgetEmbed.js')],
        bundle: true,
        minify: true,
        outfile: resolve(widgetDir, 'public/chat-widget.js'),
        target: ['es2015'],
        plugins: [
            stylePlugin({
                postcss: false // No need for full postcss for now
            })
        ],
        loader: {
            '.js': 'jsx',
            '.css': 'css'
        },
        define: {
            'process.env.NODE_ENV': '"production"'
        }
    });

    console.log('✅ Success! Build complete at: public/chat-widget.js');
} catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
}
