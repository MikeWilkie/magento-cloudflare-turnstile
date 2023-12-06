<?php
/**
 * Copyright (C) 2023 Pixel Développement
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare(strict_types=1);

namespace PixelOpen\CloudflareTurnstile\Model\Config\Source;

use Magento\Framework\Data\OptionSourceInterface;

abstract class Forms implements OptionSourceInterface
{
    /**
     * Get options as array
     *
     * @return string[][]
     */
    public function toOptionArray(): array
    {
        $options = [];

        foreach ($this->toArray() as $value) {
            $options[] = [
                'value' => $value,
                'label' => $value,
            ];
        }

        return $options;
    }

    /**
     * Get options as array
     *
     * @return string[]
     */
    abstract public function toArray(): array;
}
